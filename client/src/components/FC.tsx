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
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'sample' } },
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

  const addBranch = (label: string) => {
    if (!selectedNodeId) return;

    const parentNode = nodes.find((n) => n.id === selectedNodeId);
    if (!parentNode) return;

    const newNodeId = Math.random().toString();
    const isYes = label === 'Yes';
    
    const newNode = {
      id: newNodeId,
      position: { 
        x: parentNode.position.x + (isYes ? -150 : 150), 
        y: parentNode.position.y + 150 
      },
      data: { label: '次の処理' },
    };

    const newEdge = {
      id: `e-${Math.random()}`,
      source: parentNode.id,
      target: newNodeId,
      label: label,
      style: { stroke: isYes ? '#4caf50' : '#f44336' } 
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
  };

  const addYes = () => addBranch('Yes');
  const addNo = () => addBranch('No');

  return (
    <>
    <div style={{ width: '75vw', height: '68vh' }}>
      
      <div style={{ padding: '10px', background: '#f0f0f0', display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
        <button onClick={addNode} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          ➕ ノード追加
        </button>
        <button onClick={addYes} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          ➕ YESを追加
        </button>
        <button onClick={addNo} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          ➕ NOを追加
        </button>

        {selectedNodeId ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>名前を編集:</span>
            <input
              type="text"
              value={nodeName}
              onChange={handleChangeName}
              style={{ padding: '5px', width: '200px' }}
            />
          </div>
        ) : (
          <span style={{ color: '#888' }}>親ノードを選択してください</span>
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