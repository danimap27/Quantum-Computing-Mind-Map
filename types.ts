
export interface MindMapNodeData {
  id: string;
  name: string;
  details?: string;
  externalLink?: string;
  children?: MindMapNodeData[];
}

export interface SimulationNode extends MindMapNodeData {
  level: number;
  isRoot?: boolean;
  
  // Properties from d3-force, added when simulation runs
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface SimulationLink {
  source: string | SimulationNode;
  target: string | SimulationNode;
}