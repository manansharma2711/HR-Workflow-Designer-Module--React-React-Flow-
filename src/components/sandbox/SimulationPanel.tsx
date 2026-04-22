import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { simulateWorkflow } from '../../api/mockApi';
import { Play, CheckCircle2, AlertCircle, X, TerminalSquare } from 'lucide-react';

export default function SimulationPanel() {
  const { nodes, edges } = useWorkflowStore();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    setIsOpen(true);
    setLoading(true);
    setError(null);
    setLogs([]);

    try {
      const results = await simulateWorkflow(nodes, edges);
      setLogs(results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={runSimulation}
        className="fixed bottom-6 right-[344px] bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg shadow-indigo-200/50 transition-all hover:scale-105 z-40 group"
      >
        <Play size={20} className="group-hover:translate-x-0.5 transition-transform" />
        Simulate Run
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[85vh] border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex justify-center items-center shadow-sm border border-indigo-200">
                  <TerminalSquare size={18} />
                </div>
                <h2 className="font-bold text-gray-800 text-lg">Simulation Execution</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-white min-h-[300px]">
              {loading && (
                <div className="flex flex-col items-center justify-center h-full py-10 gap-4">
                  <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                  <p className="text-gray-500 font-medium animate-pulse text-sm tracking-wider uppercase">Executing Nodes...</p>
                </div>
              )}

              {error && !loading && (
                <div className="bg-rose-50 border border-rose-200 p-5 rounded-xl mb-4 shadow-sm">
                  <div className="flex gap-4">
                    <AlertCircle className="text-rose-500 shrink-0" size={24} />
                    <div className="mt-0.5">
                      <h3 className="font-bold text-rose-800">Validation Error</h3>
                      <p className="text-rose-600 text-sm mt-1.5 leading-relaxed">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {!loading && !error && logs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
                    <CheckCircle2 size={22} className="shrink-0"/> 
                    Workflow execution completed successfully
                  </div>
                  
                  <div className="relative border-l-2 border-indigo-100 ml-5 pl-7 space-y-6 pb-4">
                    {logs.map((log, i) => (
                      <div key={i} className="relative animate-in slide-in-from-left-4 fade-in" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                        <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-white border-2 border-indigo-500 shadow-sm"></div>
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-gray-700 text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                          {log}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-bold transition-colors shadow-sm active:scale-95"
              >
                Close Sandbox
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
