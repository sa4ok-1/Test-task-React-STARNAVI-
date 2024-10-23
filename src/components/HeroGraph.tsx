/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';
import { fetchHeroDetails, fetchVehiclesByFilm } from '../services/api';  // Import new fetch function for vehicles
import './style/HeroGraph.css';

const HeroDetails: React.FC<{ id: number }> = ({ id }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null); // State to store selected film

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

  // Fetch vehicles when a film is clicked
  useEffect(() => {
    if (selectedFilmId !== null) {
      fetchVehiclesByFilm(selectedFilmId).then(data => {
        const vehicleNodes = data.map((vehicle: any, index: number) => ({
          id: `vehicle-${vehicle.id}`,
          data: { label: vehicle.name },
          position: { x: 500, y: 100 + index * 50 },
        }));

        const vehicleEdges = data.map((vehicle: any) => ({
          id: `edge-film-vehicle-${vehicle.id}`,
          source: `film-${selectedFilmId}`,
          target: `vehicle-${vehicle.id}`,
        }));

        setNodes(prevNodes => [...prevNodes, ...vehicleNodes]);
        setEdges(prevEdges => [...prevEdges, ...vehicleEdges]);
      });
    }
  }, [selectedFilmId]);

  // Function to handle clicking on a film node
  const onFilmClick = (filmId: number) => {
    setSelectedFilmId(filmId);
  };

  return (
    <div className='HeroGraph'>
      <ReactFlow
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        nodes={nodes}
        edges={edges}
        onNodeClick={(_event, node) => {
          if (node.id.startsWith('film-')) {
            const filmId = parseInt(node.id.split('-')[1]);
            onFilmClick(filmId); // Trigger vehicle fetch
          }
        }}
      />
    </div>
  );
};

export default HeroDetails;
