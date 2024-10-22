/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';
import { fetchHeroDetails } from '../services/api';
import './HeroGraph.css'

const HeroDetails: React.FC<{ id: number }> = ({ id }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    fetchHeroDetails(id).then(data => {
      const heroNode: Node = {
        id: 'hero',
        data: { label: data.name },
        position: { x: 250, y: 5 },
      };

      const filmNodes = data.films.map((filmId: any, index: number) => ({
        id: `film-${filmId}`,
        data: { label: `Film ${filmId}` },
        position: { x: 250, y: 100 + index * 50 },
      }));


      const filmEdges = data.films.map((filmId: any) => ({
        id: `edge-hero-film-${filmId}`,
        source: 'hero',
        target: `film-${filmId}`,
      }));

      setNodes([heroNode, ...filmNodes]);
      setEdges(filmEdges);
    });
  }, [id]);
  return (
    <div className='HeroGraph'>
      <ReactFlow zoomOnScroll={false} zoomOnPinch={false} panOnScroll={false} nodes={nodes} edges={edges}  />
    </div>
  );

};

export default HeroDetails;
