
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { SimulationNode } from '../types';

interface NodeDetailModalProps {
  node: SimulationNode;
  onClose: () => void;
}

const NodeDetailModal: React.FC<NodeDetailModalProps> = ({ node, onClose }) => {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10 p-6 m-4 w-full max-w-lg relative text-gray-200 transform transition-all scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInScale 0.3s forwards ease-out' }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold font-orbitron text-cyan-400 mb-4">{t(node.id)}</h2>
        <p className="text-gray-300 whitespace-pre-wrap">{t(`${node.id}-details`)}</p>
        {node.externalLink && (
          <div className="mt-6">
            <a 
              href={node.externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-purple-400 hover:text-purple-300 transition"
            >
              {t('learn-more')}
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale { animation: fadeInScale 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default NodeDetailModal;
