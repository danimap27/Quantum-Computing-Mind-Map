
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceLink, type Simulation, type ForceLink } from 'd3-force';
import { drag, type D3DragEvent } from 'd3-drag';
import { zoom } from 'd3-zoom';
import { select, selectAll } from 'd3-selection';
import type { MindMapNodeData, SimulationNode, SimulationLink } from '../types';

interface MindMapProps {
  data: MindMapNodeData;
  onNodeClick: (node: SimulationNode) => void;
  searchTerm: string;
}

const flattenData = (node: MindMapNodeData, level: number = 0, collapsedNodes: Record<string, boolean>): { nodes: SimulationNode[], links: SimulationLink[] } => {
  const isCollapsed = collapsedNodes[node.id];
  const nodes: SimulationNode[] = [{ ...node, level, isRoot: level === 0 }];
  const links: SimulationLink[] = [];

  if (!isCollapsed && node.children) {
    node.children.forEach(child => {
      links.push({ source: node.id, target: child.id });
      const childData = flattenData(child, level + 1, collapsedNodes);
      nodes.push(...childData.nodes);
      links.push(...childData.links);
    });
  }
  return { nodes, links };
};

const NODE_SIZES = [32, 24, 18, 14];
const FONT_SIZES = ['16px', '14px', '12px', '11px'];
const LINK_DISTANCE = [150, 90, 70, 50];
const LINK_WIDTH = [2.5, 1.5, 1, 1];
const CHARGE_STRENGTH = -800;
const LEVEL_COLORS = ['#8b5cf6', '#22d3ee', '#34d399', '#f59e0b', '#9ca3af'];

const MindMap: React.FC<MindMapProps> = ({ data, onNodeClick, searchTerm }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<Simulation<SimulationNode, SimulationLink> | null>(null);

  const [renderNodes, setRenderNodes] = useState<SimulationNode[]>([]);
  const [renderLinks, setRenderLinks] = useState<SimulationLink[]>([]);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({'foundations': true, 'algorithms': true, 'hardware': true, 'software': true, 'learning': true, 'future': true});

  const { nodes: visibleNodes, links: visibleLinks } = useMemo(() => {
    return flattenData(data, 0, collapsedNodes);
  }, [data, collapsedNodes]);

  const handleNodeClick = useCallback((node: SimulationNode) => {
    if (node.children && node.children.length > 0) {
      setCollapsedNodes(prev => ({ ...prev, [node.id]: !prev[node.id] }));
    } else {
      onNodeClick(node);
    }
  }, [onNodeClick]);
  
  const isHighlighted = useCallback((node: SimulationNode) => {
    if (!searchTerm) return false;
    return node.name.toLowerCase().includes(searchTerm.toLowerCase());
  }, [searchTerm]);

  const createDragHandler = (simulation: Simulation<SimulationNode, SimulationLink>) => {
    function dragstarted(event: D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
      const d = event.subject;
      if (!d) return;
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x ?? null;
      d.fy = d.y ?? null;
    }
    function dragged(event: D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
      const d = event.subject;
      if (!d) return;
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event: D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
      const d = event.subject;
      if (!d) return;
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    return drag<SVGGElement, SimulationNode>().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    const simulation = simulationRef.current || forceSimulation<SimulationNode>()
        .force("charge", forceManyBody().strength(CHARGE_STRENGTH))
        .force("center", forceCenter(width / 2, height / 2))
        // Increase collision radius to account for text labels, preventing overlap
        .force("collide", forceCollide<SimulationNode>(d => (NODE_SIZES[d.level] ?? 8) + 25).strength(1));

    simulationRef.current = simulation;

    const linkForce = (simulation.force('link') as ForceLink<SimulationNode, SimulationLink> || forceLink<SimulationNode, SimulationLink>())
        .id((d) => (d as SimulationNode).id)
        .distance(d => LINK_DISTANCE[(d.source as SimulationNode).level] ?? 50)
        .strength(1);
    
    simulation.force('link', linkForce);

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.2, 5])
        .on('zoom', (event) => {
            select(svgRef.current?.querySelector('g') as SVGGElement).attr('transform', event.transform.toString());
        });

    select(svgRef.current).call(zoomBehavior);

    if (simulationRef.current) {
        const nodeSelection = selectAll<SVGGElement, SimulationNode>('.node-group');
        nodeSelection.call(createDragHandler(simulationRef.current));
    }

    return () => {
        simulation.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const simulation = simulationRef.current;
    if (!simulation) return;

    const oldNodePositions = new Map(renderNodes.map(n => [n.id, { x: n.x, y: n.y, fx: n.fx, fy: n.fy }]));
    
    const newNodes = visibleNodes.map(n => {
        const oldPos = oldNodePositions.get(n.id);
        const existingNode = simulation.nodes().find(sn => sn.id === n.id);
        return { ...n, ...(existingNode || {}), ...(oldPos || {}) };
    });

    simulation.nodes(newNodes);
    (simulation.force('link') as ForceLink<SimulationNode, SimulationLink>).links(visibleLinks);
    simulation.on('tick', () => {
        setRenderNodes([...simulation.nodes()]);
        setRenderLinks([...(simulation.force('link') as ForceLink<SimulationNode, SimulationLink>).links()]);
    });
    simulation.alpha(0.6).restart();

  }, [visibleNodes, visibleLinks]);


  useEffect(() => {
    if (simulationRef.current) {
        const nodeSelection = selectAll<SVGGElement, SimulationNode>('.node-group');
        nodeSelection.call(createDragHandler(simulationRef.current));
    }
  }, [renderNodes]);


  return (
    <div ref={containerRef} className="w-full h-full cursor-grab">
      <svg ref={svgRef} className="w-full h-full">
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g>
          {renderLinks.map((link, i) => {
            const source = link.source as SimulationNode;
            const target = link.target as SimulationNode;

            if (!source || !target || typeof source === 'string' || typeof target === 'string' || source.x === undefined || source.y === undefined || target.x === undefined || target.y === undefined) {
                return null;
            }
            
            const sourceHighlighted = isHighlighted(source);
            const targetHighlighted = isHighlighted(target);
            
            return (
              <line
                key={`${source.id}-${target.id}-${i}`}
                x1={source.x} y1={source.y}
                x2={target.x} y2={target.y}
                stroke={sourceHighlighted && targetHighlighted ? '#34d399' : '#4b5563'}
                strokeWidth={(sourceHighlighted && targetHighlighted) ? (LINK_WIDTH[source.level] ?? 1) * 1.5 : (LINK_WIDTH[source.level] ?? 1)}
                strokeOpacity={0.7}
                className="transition-all"
              />
            );
          })}
          {renderNodes.map(node => {
            const nodeRadius = NODE_SIZES[node.level] ?? 8;
            const highlighted = isHighlighted(node);
            const nodeColor = LEVEL_COLORS[node.level] ?? LEVEL_COLORS[LEVEL_COLORS.length - 1];
            const canExpand = node.children && node.children.length > 0;
            const isCollapsed = collapsedNodes[node.id];

            return (
              <g
                key={node.id}
                transform={`translate(${node.x || 0}, ${node.y || 0})`}
                className="node-group cursor-pointer group"
                onClick={() => handleNodeClick(node)}
              >
                <circle
                  r={nodeRadius}
                  fill={nodeColor}
                  stroke={highlighted ? '#fbbf24' : nodeColor}
                  strokeWidth={highlighted ? 4 : 2}
                  strokeOpacity={0.8}
                  className="transition-all duration-300 group-hover:stroke-white"
                  style={{ filter: highlighted ? 'url(#glow)' : 'none' }}
                />
                 <text
                  textAnchor="middle"
                  y={nodeRadius + 15}
                  fontSize={FONT_SIZES[node.level] ?? '10px'}
                  className="fill-gray-100 group-hover:fill-white transition-colors duration-300 font-semibold pointer-events-none"
                   style={{
                      paintOrder: 'stroke',
                      stroke: '#111827',
                      strokeWidth: '3px',
                      strokeLinejoin: 'round',
                  }}
                >
                  {node.name}
                </text>

                {/* Expand/Collapse Indicator */}
                {canExpand && (
                    <g>
                        <circle
                            cx={nodeRadius}
                            cy={0}
                            r={8}
                            fill="#1f2937"
                            stroke="#9ca3af"
                            strokeWidth="1"
                        />
                        <text
                            x={nodeRadius}
                            y={1}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="font-mono font-bold pointer-events-none select-none"
                            fill={isCollapsed ? '#6ee7b7' : '#fde047'}
                            fontSize="14px"
                        >
                            {isCollapsed ? '+' : '−'}
                        </text>
                    </g>
                )}
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  );
};

export default MindMap;
