import { Handle, Position } from '@xyflow/react';
import { Zap } from 'lucide-react';

export default function AutomationNode({ data, selected }: any) {
  return (
    <div className={`px-4 py-3 bg-white rounded-xl border-2 transition-all shadow-sm ${selected ? 'border-purple-500 shadow-md ring-2 ring-purple-100' : 'border-gray-200 hover:border-purple-300'} w-64`}>
      <Handle type="target" position={Position.Top} className="!bg-purple-500 !w-3 !h-3 !border-2 !border-white" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
          <Zap size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold tracking-wider text-purple-500 uppercase">Automation</div>
          <div className="font-medium text-gray-800 truncate">{data.title || "Automated Step"}</div>
          {data.action && <div className="text-[11px] text-gray-500 mt-0.5 truncate">Action: {data.action}</div>}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500 !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
}
