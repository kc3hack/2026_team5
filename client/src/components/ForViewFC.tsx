import ReactFlow, {
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function ForViewFC({
  nodes,
  edges,
}: any) {

  return (
    <>
 
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background gap={12} size={1} />
      </ReactFlow>
    </>
  );
}