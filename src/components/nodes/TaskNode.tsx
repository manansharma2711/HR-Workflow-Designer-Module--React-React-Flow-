import { Handle, Position } from '@xyflow/react';
import { ClipboardList } from 'lucide-react';

export default function TaskNode({ data, selected }: any) {
  return (
    <div className={`px-4 py-3 bg-white rounded-xl border-2 transition-all shadow-sm ${selected ? 'border-blue-500 shadow-md ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-300'} w-64`}>
      <Handle type="target" position={Position.Top} className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <ClipboardList size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold tracking-wider text-blue-500 uppercase">Human Task</div>
          <div className="font-medium text-gray-800 truncate">{data.title || "Task"}</div>
          {data.assignee && <div className="text-[11px] text-gray-500 mt-0.5 truncate flex items-center gap-1"><span className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-[8px]">👤</span> {data.assignee}</div>}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
}
