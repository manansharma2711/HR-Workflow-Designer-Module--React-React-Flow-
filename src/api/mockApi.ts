import type { CustomNode, CustomEdge } from '../types/workflow.types';

export const getAutomations = async () => {
  return new Promise<{ id: string, label: string, params: string[] }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "send_email", label: "Send Email", params: ["to", "subject"] },
        { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
        { id: "update_record", label: "Update Employee Record", params: ["employeeId", "status"] }
      ]);
    }, 500);
  });
};

export const simulateWorkflow = async (nodes: CustomNode[], edges: CustomEdge[]) => {
  return new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      const startNodes = nodes.filter(n => n.type === 'start');
      if (startNodes.length === 0) return reject(new Error("No Start Node found."));
      if (startNodes.length > 1) return reject(new Error("Multiple Start Nodes found."));
      
      const endNodes = nodes.filter(n => n.type === 'end');
      if (endNodes.length === 0) return reject(new Error("No End Node found."));

      const logs: string[] = [];
      let currentNodeId: string | null = startNodes[0].id;

      const visited = new Set<string>();

      while (currentNodeId) {
        if (visited.has(currentNodeId)) {
          return reject(new Error("Cycle detected in the workflow."));
        }
        visited.add(currentNodeId);

        const node = nodes.find(n => n.id === currentNodeId);
        if (!node) break;

        switch (node.type) {
          case 'start':
            logs.push(`Start workflow: ${node.data.title}`);
            break;
          case 'task':
            logs.push(`Task: ${node.data.title}` + (node.data.assignee ? ` assigned to ${node.data.assignee}` : ''));
            break;
          case 'approval':
            logs.push(`Approval: ${node.data.title}` + (node.data.approverRole ? ` (Role: ${node.data.approverRole})` : ''));
            break;
          case 'automation':
            // @ts-ignore
            logs.push(`Automation: ${node.data.title} [Action: ${node.data.action || 'None'}]`);
            break;
          case 'end':
            // @ts-ignore
            logs.push(`End workflow: ${node.data.title}` + (node.data.endMessage ? ` - ${node.data.endMessage}` : ''));
            break;
          default:
            logs.push(`Unknown step: ${node.data.title}`);
        }

        const outgoingEdges = edges.filter(e => e.source === currentNodeId);
        
        if (outgoingEdges.length > 1) {
          logs.push(`Branching detected, following first path...`);
        }

        if (outgoingEdges.length > 0) {
          currentNodeId = outgoingEdges[0].target;
        } else {
          currentNodeId = null;
          if (node.type !== 'end') {
             return reject(new Error(`Workflow disconnected at node: "${node.data.title}". Expected path to an End Node.`));
          }
        }
      }

      const hasUnvisitedNodes = nodes.length > visited.size;
      if (hasUnvisitedNodes) {
         logs.push(`Warning: ${nodes.length - visited.size} disconnected nodes were skipped.`);
      }

      resolve(logs);
    }, 1000);
  });
};
