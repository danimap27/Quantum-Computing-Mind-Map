
import React, { useState, useCallback } from 'react';
import { mindMapData } from './data/mindMapData';
import MindMap from './components/MindMap';
import NodeDetailModal from './components/NodeDetailModal';
import { SearchIcon, BrandIcon } from './components/Icons';
import type { SimulationNode } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<SimulationNode | null>(null);

  const handleNodeSelect = useCallback((node: SimulationNode | null) => {
    if (node && node.details) {
      setSelectedNode(node);
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 overflow-hidden">
      <header className="flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border-b border-blue-500/20 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BrandIcon className="h-8 w-8 text-cyan-400" />
              <h1 className="text-xl sm:text-2xl font-bold font-orbitron text-white tracking-wider">
                Quantum Mind Map
              </h1>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 sm:w-64 bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow relative">
        <MindMap
          data={mindMapData}
          onNodeClick={handleNodeSelect}
          searchTerm={searchTerm}
        />
      </main>
      {selectedNode && (
        <NodeDetailModal node={selectedNode} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
