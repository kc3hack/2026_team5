import { useCallback, useState } from 'react'; 
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  type Connection,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function FC({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setNodes,
  setEdges
}: any) {

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const [nodeName, setNodeName] = useState("");

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (event: React.MouseEvent, node: any) => {
    setSelectedNodeId(node.id); 
    setNodeName(node.data.label);
    console.log(event);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    console.log(e);
    setNodeName(newName); 

    setNodes((nds: any[]) =>
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
    setNodes((nds: any[]) => nds.concat(newNode));
  };

  const addBranch = (label: string) => {
    if (!selectedNodeId) return;

    const parentNode = nodes.find((n: any) => n.id === selectedNodeId);
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

    setNodes((nds: any[]) => nds.concat(newNode));
    setEdges((eds: any[]) => eds.concat(newEdge));
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