import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import NodePopup from './NodePopup';
import ExportButton from './ExportButton';

const nodeTypes = {
  custom: CustomNode,
};

export default function ArchitectureDiagram({ arquitetura, editable = false, onExport }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(arquitetura.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(arquitetura.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node.data);
    setPopupOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopupOpen(false);
    setTimeout(() => setSelectedNode(null), 200);
  }, []);

  return (
    <>
      <div className="h-[600px] w-full rounded-lg border bg-background" id="react-flow-diagram">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={editable ? onNodesChange : undefined}
          onEdgesChange={editable ? onEdgesChange : undefined}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={1.5}
          defaultEdgeOptions={{
            animated: false,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
          }}
        >
          <Background />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const tipo = node.data?.tipo || 'processamento';
              const colors = {
                entrada: '#3b82f6',
                processamento: '#a855f7',
                armazenamento: '#22c55e',
                saida: '#f97316',
                monitoramento: '#eab308',
              };
              return colors[tipo] || colors.processamento;
            }}
            className="!bg-background !border !border-border"
          />

          <Panel position="top-right" className="space-x-2">
            <ExportButton arquitetura={arquitetura} onExport={onExport} />
          </Panel>

          <Panel position="bottom-left" className="bg-background/90 backdrop-blur-sm p-3 rounded-lg border">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">{arquitetura.nome}</h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                  {arquitetura.nivel}
                </span>
                <span className="px-2 py-1 rounded bg-secondary">
                  Custo: {arquitetura.custoEstimado}
                </span>
                <span className="px-2 py-1 rounded bg-secondary">
                  Complexidade: {arquitetura.complexidade}
                </span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      <NodePopup nodeData={selectedNode} open={popupOpen} onClose={handleClosePopup} />
    </>
  );
}

