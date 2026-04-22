import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';

export default function StartNode({ data, selected }: any) {
  return (
    <div className={`px-4 py-3 bg-white rounded-xl border-2 transition-all shadow-sm ${selected ? 'border-emerald-500 shadow-md ring-2 ring-emerald-100' : 'border-gray-200 hover:border-emerald-300'} w-64`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
          <Play size={16} fill="currentColor" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase">Start</div>
          <div className="font-medium text-gray-800 truncate">{data.title || "Start Workflow"}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-500 !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
}
