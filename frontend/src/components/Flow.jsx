import React, { useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import '../../src/flow.css';


export default function Flow() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('AI response will appear here...');
  const [loading, setLoading] = useState(false);

  const nodes = [
    {
      id: 'input',
      position: { x: 80, y: 150 },
      data: {
        label: (
          <div className="node input-node">
            <h4>Prompt</h4>
            <textarea
              placeholder="Type your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        ),
      },
    },
    {
      id: 'output',
      position: { x: 420, y: 150 },
      data: {
        label: (
          <div className="node output-node">
            <h4>AI Response</h4>
            <div className="response-box">
              {loading ? 'Thinking...' : result}
            </div>
          </div>
        ),
      },
    },
  ];

  const edges = [{ id: 'e1-2', source: 'input', target: 'output' }];

  // Run Flow
  const runFlow = async () => {
    if (!prompt.trim()) return alert('Enter a prompt');

    try {
      setLoading(true);
      const res = await axios.post('https://ai-flow-builder.onrender.com/api/ask-ai', { prompt });

      
      setResult(res.data.response);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setResult('Error getting response');
    } finally {
      setLoading(false);
    }
  };

  const saveFlow = async () => {
    if (!prompt || !result) return alert('Nothing to save');

    try {
      await axios.post('https://ai-flow-builder.onrender.com/api/save', {
        prompt,
        response: result,
      });
      alert('Saved to MongoDB');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Save failed');
    }
  };

  return (
    <div className="flow-container">
      {/* Top Controls */}
      <div className="top-actions">
        <button className="btn run" onClick={runFlow}>
          Run Flow
        </button>
        <button className="btn save" onClick={saveFlow}>
          Save
        </button>
      </div>

      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
