import { Handle, Position } from '@xyflow/react';
import { UserCheck } from 'lucide-react';

export default function ApprovalNode({ data, selected }: any) {
  return (
    <div className={`px-4 py-3 bg-white rounded-xl border-2 transition-all shadow-sm ${selected ? 'border-amber-500 shadow-md ring-2 ring-amber-100' : 'border-gray-200 hover:border-amber-300'} w-64`}>
      <Handle type="target" position={Position.Top} className="!bg-amber-500 !w-3 !h-3 !border-2 !border-white" />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
          <UserCheck size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold tracking-wider text-amber-500 uppercase">Approval</div>
          <div className="font-medium text-gray-800 truncate">{data.title || "Approval Step"}</div>
          {data.approverRole && <div className="text-[11px] text-gray-500 mt-0.5 truncate">Role: {data.approverRole}</div>}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-amber-500 !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
}
