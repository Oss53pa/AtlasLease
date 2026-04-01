// ---------------------------------------------------------------------------
// Approval Workflow Engine
// ---------------------------------------------------------------------------
// TODO: Replace in-memory store with Supabase tables `workflow_instances`
//       and `workflow_steps` once the schema migration is in place.
// ---------------------------------------------------------------------------

// TODO: import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WorkflowType = 'RENEWAL' | 'TERMINATION' | 'AMENDMENT' | 'NEW_LEASE';

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ApprovalStep {
  id: string;
  role: string;
  threshold_amount: number | null;
  status: ApprovalStatus;
  decided_by: string | null;
  decided_at: string | null; // ISO-8601
  comment: string | null;
}

export interface WorkflowInstance {
  id: string;
  type: WorkflowType;
  entity_id: string;
  steps: ApprovalStep[];
  current_step: number; // index into steps[]
  created_at: string;   // ISO-8601
  completed_at: string | null;
}

export type WorkflowOverallStatus =
  | 'IN_PROGRESS'
  | 'APPROVED'
  | 'REJECTED';

export interface WorkflowStatus {
  workflow_id: string;
  overall: WorkflowOverallStatus;
  current_step: number;
  total_steps: number;
  steps: ApprovalStep[];
}

// ---------------------------------------------------------------------------
// Default step templates per workflow type
// ---------------------------------------------------------------------------

const DEFAULT_STEPS: Record<WorkflowType, Omit<ApprovalStep, 'id'>[]> = {
  NEW_LEASE: [
    { role: 'PROPERTY_MANAGER', threshold_amount: null, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
    { role: 'FINANCE_MANAGER', threshold_amount: 50_000, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
    { role: 'DIRECTOR', threshold_amount: 200_000, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
  ],
  RENEWAL: [
    { role: 'PROPERTY_MANAGER', threshold_amount: null, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
    { role: 'FINANCE_MANAGER', threshold_amount: 100_000, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
  ],
  TERMINATION: [
    { role: 'PROPERTY_MANAGER', threshold_amount: null, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
    { role: 'LEGAL_COUNSEL', threshold_amount: null, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
    { role: 'DIRECTOR', threshold_amount: null, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
  ],
  AMENDMENT: [
    { role: 'PROPERTY_MANAGER', threshold_amount: null, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
    { role: 'FINANCE_MANAGER', threshold_amount: 50_000, status: 'PENDING', decided_by: null, decided_at: null, comment: null },
  ],
};

// ---------------------------------------------------------------------------
// In-memory mock store
// ---------------------------------------------------------------------------

let workflowStore: WorkflowInstance[] = [];

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Create a new approval workflow for the given entity.
 * Uses default step templates unless custom steps are provided.
 */
export async function createWorkflow(
  type: WorkflowType,
  entityId: string,
  customSteps?: Omit<ApprovalStep, 'id'>[],
): Promise<WorkflowInstance> {
  const stepsTemplate = customSteps ?? DEFAULT_STEPS[type];

  const steps: ApprovalStep[] = stepsTemplate.map((s) => ({
    ...s,
    id: generateId('step'),
  }));

  const instance: WorkflowInstance = {
    id: generateId('wf'),
    type,
    entity_id: entityId,
    steps,
    current_step: 0,
    created_at: new Date().toISOString(),
    completed_at: null,
  };

  // TODO: Replace with Supabase insert
  // const { error } = await supabase.from('workflow_instances').insert(instance);

  workflowStore.push(instance);
  return instance;
}

/**
 * Approve the current step of a workflow.
 * Advances `current_step` to the next pending step or marks the workflow complete.
 */
export async function approveStep(
  workflowId: string,
  userId: string,
  comment?: string,
): Promise<WorkflowInstance> {
  const wf = workflowStore.find((w) => w.id === workflowId);
  if (!wf) throw new Error(`Workflow ${workflowId} not found`);

  const step = wf.steps[wf.current_step];
  if (!step || step.status !== 'PENDING') {
    throw new Error('No pending step to approve');
  }

  step.status = 'APPROVED';
  step.decided_by = userId;
  step.decided_at = new Date().toISOString();
  step.comment = comment ?? null;

  // Advance to next pending step or mark complete
  const nextIndex = wf.steps.findIndex(
    (s, i) => i > wf.current_step && s.status === 'PENDING',
  );

  if (nextIndex === -1) {
    // All steps approved
    wf.completed_at = new Date().toISOString();
  } else {
    wf.current_step = nextIndex;
  }

  // TODO: Replace with Supabase update

  return wf;
}

/**
 * Reject the current step. The entire workflow is considered rejected.
 */
export async function rejectStep(
  workflowId: string,
  userId: string,
  comment?: string,
): Promise<WorkflowInstance> {
  const wf = workflowStore.find((w) => w.id === workflowId);
  if (!wf) throw new Error(`Workflow ${workflowId} not found`);

  const step = wf.steps[wf.current_step];
  if (!step || step.status !== 'PENDING') {
    throw new Error('No pending step to reject');
  }

  step.status = 'REJECTED';
  step.decided_by = userId;
  step.decided_at = new Date().toISOString();
  step.comment = comment ?? null;

  wf.completed_at = new Date().toISOString();

  // TODO: Replace with Supabase update

  return wf;
}

/**
 * Get the current status summary of a workflow.
 */
export async function getWorkflowStatus(
  workflowId: string,
): Promise<WorkflowStatus> {
  const wf = workflowStore.find((w) => w.id === workflowId);
  if (!wf) throw new Error(`Workflow ${workflowId} not found`);

  let overall: WorkflowOverallStatus = 'IN_PROGRESS';
  if (wf.steps.some((s) => s.status === 'REJECTED')) {
    overall = 'REJECTED';
  } else if (wf.steps.every((s) => s.status === 'APPROVED')) {
    overall = 'APPROVED';
  }

  return {
    workflow_id: wf.id,
    overall,
    current_step: wf.current_step,
    total_steps: wf.steps.length,
    steps: wf.steps,
  };
}

/**
 * Retrieve all workflows associated with a given entity.
 */
export async function getWorkflowsByEntity(
  entityId: string,
): Promise<WorkflowInstance[]> {
  // TODO: Replace with Supabase query
  return workflowStore.filter((w) => w.entity_id === entityId);
}

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

/** @internal Reset the in-memory store. Useful for tests. */
export function _resetStore(): void {
  workflowStore = [];
}
