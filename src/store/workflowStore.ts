import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { Connection, EdgeChange, NodeChange } from '@xyflow/react';
import type { CustomNode, CustomEdge } from '../types/workflow.types';
import { v4 as uuidv4 } from 'uuid';

interface WorkflowStore {
  nodes: CustomNode[];
  edges: CustomEdge[];
  selectedNodeId: string | null;
  
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  
  addNode: (node: Omit<CustomNode, 'id'>) => void;
  updateNodeData: (id: string, data: any) => void;
  deleteNode: (id: string, edgesToDelete?: CustomEdge[]) => void;
  deleteEdge: (id: string) => void;
  
  setSelectedNodeId: (id: string | null) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as CustomNode[],
    });
  },
  
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as CustomEdge[],
    });
  },
  
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  addNode: (node) => {
    const id = uuidv4();
    const newNode = { ...node, id } as CustomNode;
    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) => 
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  deleteNode: (id, edgesToDelete = []) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id && !edgesToDelete.map(e => e.id).includes(edge.id)),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },
  
  deleteEdge: (id) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== id),
    });
  },

  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id });
  },
}));
