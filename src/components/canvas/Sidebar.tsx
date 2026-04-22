import { Play, ClipboardList, UserCheck, Zap, Flag } from 'lucide-react';

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-[280px] bg-white border-r border-gray-200 p-5 flex flex-col gap-4 shadow-sm z-10 shrink-0 select-none">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Building Blocks</div>
      
      <div 
        className="flex items-center gap-4 p-3 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-grab hover:border-emerald-400 hover:bg-emerald-50 transition-all active:cursor-grabbing"
        onDragStart={(e) => onDragStart(e, 'start')} 
        draggable
      >
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm"><Play size={18} fill="currentColor" /></div>
        <div className="font-semibold text-gray-700">Start Step</div>
      </div>

      <div 
        className="flex items-center gap-4 p-3 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-grab hover:border-blue-400 hover:bg-blue-50 transition-all active:cursor-grabbing"
        onDragStart={(e) => onDragStart(e, 'task')} 
        draggable
      >
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm"><ClipboardList size={20} /></div>
        <div className="font-semibold text-gray-700">Human Task</div>
      </div>
      
      <div 
        className="flex items-center gap-4 p-3 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-grab hover:border-amber-400 hover:bg-amber-50 transition-all active:cursor-grabbing"
        onDragStart={(e) => onDragStart(e, 'approval')} 
        draggable
      >
        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm"><UserCheck size={20} /></div>
        <div className="font-semibold text-gray-700">Approval Step</div>
      </div>
      
      <div 
        className="flex items-center gap-4 p-3 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-grab hover:border-purple-400 hover:bg-purple-50 transition-all active:cursor-grabbing"
        onDragStart={(e) => onDragStart(e, 'automation')} 
        draggable
      >
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm"><Zap size={20} /></div>
        <div className="font-semibold text-gray-700">Automation</div>
      </div>
      
      <div 
        className="flex items-center gap-4 p-3 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-grab hover:border-rose-400 hover:bg-rose-50 transition-all active:cursor-grabbing"
        onDragStart={(e) => onDragStart(e, 'end')} 
        draggable
      >
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm"><Flag size={18} /></div>
        <div className="font-semibold text-gray-700">End Step</div>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
        Drag and drop blocks onto the canvas to construct your workflow.
      </div>
    </div>
  );
}
