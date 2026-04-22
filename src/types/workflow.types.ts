import type { Node, Edge } from '@xyflow/react';

export type NodeType = 'start' | 'task' | 'approval' | 'automation' | 'end';

export interface BaseNodeData extends Record<string, unknown> {
  title: string;
}

export interface StartNodeData extends BaseNodeData {
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomationNodeData extends BaseNodeData {
  action?: string;
  params?: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  endMessage?: string;
  summaryFlag?: boolean;
}

export type CustomNodeData = StartNodeData | TaskNodeData | ApprovalNodeData | AutomationNodeData | EndNodeData;

export type CustomNode = Node<CustomNodeData, NodeType>;
export type CustomEdge = Edge;

export interface WorkflowState {
  nodes: CustomNode[];
  edges: CustomEdge[];
}
