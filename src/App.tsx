import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import Sidebar from './components/canvas/Sidebar';
import ConfigPanel from './components/forms/ConfigPanel';
import SimulationPanel from './components/sandbox/SimulationPanel';
import '@xyflow/react/dist/style.css'; 

function App() {
  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans">
      <div className="flex-1 flex flex-col relative h-full">
        <header className="h-[60px] bg-white border-b border-gray-200 flex items-center px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              HR
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Workflow Designer</h1>
          </div>
        </header>
        
        <div className="flex-1 flex overflow-hidden relative">
          <Sidebar />
          <div className="flex-1 relative h-full bg-slate-50">
            <WorkflowCanvas />
          </div>
          <ConfigPanel />
        </div>
      </div>
      <SimulationPanel />
    </div>
  );
}

export default App;
