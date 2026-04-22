import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkflowStore } from '../../store/workflowStore';
import { Settings, X } from 'lucide-react';
import { getAutomations } from '../../api/mockApi';

export default function ConfigPanel() {
  const { selectedNodeId, nodes, updateNodeData, setSelectedNodeId } = useWorkflowStore();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  
  const { register, handleSubmit, reset } = useForm();
  
  const [automations, setAutomations] = useState<{id:string, label:string}[]>([]);

  useEffect(() => {
    if (selectedNode?.type === 'automation') {
      getAutomations().then(data => setAutomations(data));
    }
  }, [selectedNode?.type]);

  useEffect(() => {
    if (selectedNode) {
      reset(selectedNode.data || {});
    }
  }, [selectedNodeId, reset]); 

  if (!selectedNodeId || !selectedNode) {
    return (
      <div className="w-[320px] bg-white border-l border-gray-200 p-6 flex flex-col justify-center items-center text-center shrink-0 shadow-sm z-10 hidden lg:flex">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 border border-gray-100">
          <Settings size={28} />
        </div>
        <h3 className="text-gray-800 font-semibold mb-2">Node Configuration</h3>
        <p className="text-sm text-gray-500 leading-relaxed">Select a node on the canvas to configure its properties.</p>
      </div>
    );
  }

  const onSubmit = (data: any) => {
    updateNodeData(selectedNodeId, data);
  };

  return (
    <div className="w-[320px] bg-white border-l border-gray-200 flex flex-col shrink-0 shadow-lg z-20">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-slate-50/80 backdrop-blur">
        <div className="font-semibold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Settings size={16} className="text-indigo-500"/> {selectedNode.type} Params
        </div>
        <button onClick={() => setSelectedNodeId(null)} className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <form id="node-config-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Display Title <span className="text-rose-500">*</span></label>
            <input 
              {...register('title', { required: true })} 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-gray-800 shadow-sm"
              placeholder="e.g. Start Here"
            />
          </div>

          {selectedNode.type === 'start' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Trigger Type</label>
              <select {...register('metadata.triggerType')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm">
                <option value="manual">Manual Execution</option>
                <option value="schedule">Scheduled</option>
                <option value="webhook">Webhook Integration</option>
              </select>
            </div>
          )}

          {selectedNode.type === 'task' && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Task Description</label>
                <textarea 
                  {...register('description')} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm min-h-[80px] focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  placeholder="What needs to be done?"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Assignee</label>
                <input 
                  {...register('assignee')} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  placeholder="e.g. John Doe, IT Dept"
                />
              </div>
            </>
          )}

          {selectedNode.type === 'approval' && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Approver Role <span className="text-rose-500">*</span></label>
                <select {...register('approverRole', { required: true })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm">
                  <option value="">Select a role...</option>
                  <option value="Manager">Direct Manager</option>
                  <option value="HR">HR Team</option>
                  <option value="Director">Department Director</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Auto-approve after (days)</label>
                <input 
                  type="number"
                  {...register('autoApproveThreshold')} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  placeholder="Leave empty for none"
                />
              </div>
            </>
          )}

          {selectedNode.type === 'automation' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Action Type <span className="text-rose-500">*</span></label>
              <select {...register('action', { required: true })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm">
                <option value="">Select an action...</option>
                {automations.map(a => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>
          )}

          {selectedNode.type === 'end' && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">End Message</label>
                <input 
                  {...register('endMessage')} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  placeholder="e.g. Process Completed Successfully"
                />
              </div>
              <div className="flex items-center gap-2 mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm">
                <input 
                  type="checkbox"
                  id="summaryFlag"
                  {...register('summaryFlag')} 
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="summaryFlag" className="text-sm font-semibold text-gray-700">Send final summary report</label>
              </div>
            </>
          )}
        </form>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
        <button 
          form="node-config-form"
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-[0.98]"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}
