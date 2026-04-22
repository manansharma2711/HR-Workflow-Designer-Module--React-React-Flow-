import { Handle, Position } from '@xyflow/react';
import { Flag } from 'lucide-react';

export default function EndNode({ data, selected }: any) {
  return (
    <div className={`px-4 py-3 bg-white rounded-xl border-2 transition-all shadow-sm ${selected ? 'border-rose-500 shadow-md ring-2 ring-rose-100' : 'border-gray-200 hover:border-rose-300'} w-64`}>
      <Handle type="target" position={Position.Top} className="!bg-rose-500 !w-3 !h-3 !border-2 !border-white" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
          <Flag size={16} />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold tracking-wider text-rose-500 uppercase">End</div>
          <div className="font-medium text-gray-800 truncate">{data.title || "End Workflow"}</div>
        </div>
      </div>
    </div>
  );
}
