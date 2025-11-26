import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <header className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md z-10">
        <div className="text-xl font-bold flex items-center gap-2">
          🛡️ AI Underwriter Helper
        </div>
        <div className="text-sm text-gray-400 font-medium">
          Glass Box Pricing Engine
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
