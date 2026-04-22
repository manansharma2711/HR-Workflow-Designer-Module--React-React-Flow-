import { useRef, useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { ReactFlow, Background, Controls, MiniMap, useReactFlow, ReactFlowProvider } from '@xyflow/react';
import { useWorkflowStore } from '../../store/workflowStore';
import '@xyflow/react/dist/style.css';

import StartNode from '../nodes/StartNode';
import TaskNode from '../nodes/TaskNode';
import ApprovalNode from '../nodes/ApprovalNode';
import AutomationNode from '../nodes/AutomationNode';
import EndNode from '../nodes/EndNode';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automation: AutomationNode,
  end: EndNode,
};

function CanvasInner() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setSelectedNodeId, addNode, deleteNode, deleteEdge, selectedNodeId } = useWorkflowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !Object.keys(nodeTypes).includes(type)) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        type,
        position,
        data: { title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}` },
      };

      addNode(newNode as any);
    },
    [screenToFlowPosition, addNode]
  );

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId) {
      deleteNode(selectedNodeId);
    }
  }, [selectedNodeId, deleteNode]);

  return (
    <div className="w-full h-full bg-slate-50/50" ref={reactFlowWrapper} onKeyDown={onKeyDown}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes as any}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesDelete={(edges) => {
          edges.forEach(e => deleteEdge(e.id));
        }}
        onNodesDelete={(deletedNodes) => {
          deletedNodes.forEach(n => deleteNode(n.id));
        }}
        fitView
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls />
        <MiniMap zoomable pannable
          nodeColor={(n: any) => {
            if (n.type === 'start') return '#10b981';
            if (n.type === 'end') return '#f43f5e';
            if (n.type === 'task') return '#3b82f6';
            if (n.type === 'approval') return '#f59e0b';
            if (n.type === 'automation') return '#a855f7';
            return '#cbd5e1';
          }}
        />
      </ReactFlow>
    </div>
  );
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
