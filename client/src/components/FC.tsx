import { useCallback, useState } from 'react'; 
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Process' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const [nodeName, setNodeName] = useState("");

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (event: React.MouseEvent, node: any) => {
    setSelectedNodeId(node.id); 
    setNodeName(node.data.label);
  };


  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNodeName(newName); 

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: { ...node.data, label: newName },
          };
        }
        return node; 
      })
    );
  };

  const addNode = () => {
    const newNode = {
      id: Math.random().toString(),
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: '名称未設定のノード' },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <>
    <div style={{ width: '50vw', height: '60vh' }}>
      
      <div style={{ padding: '15px', background: '#f0f0f0', display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
        <button onClick={addNode} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          ➕ ノード追加
        </button>

        {selectedNodeId ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>名前を編集:</span>
            <input
              type="text"
              value={nodeName}
              onChange={handleChangeName}
              style={{ padding: '5px', width: '200px' }}
            />
          </div>
        ) : (
          <span style={{ color: '#888' }}>ノードをクリックすると編集できます</span>
        )}
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
    </>
  );
}