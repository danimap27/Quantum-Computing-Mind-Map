
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { mindMapData } from './data/mindMapData';
import MindMap from './components/MindMap';
import NodeDetailModal from './components/NodeDetailModal';
import { SearchIcon, BrandIcon } from './components/Icons';
import LanguageSwitcher from './components/LanguageSwitcher';
import type { SimulationNode } from './types';

const App: React.FC = () => {
  const { t } = useTranslation();
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
                {t('title')}
              </h1>
            </div>
            <div className="relative">
              <LanguageSwitcher />
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
