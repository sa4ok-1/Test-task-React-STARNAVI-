/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';
import { fetchHeroDetails, fetchFilmDetails, fetchVehiclesByFilm } from '../services/api'; // додано fetchFilmDetails
import './style/HeroGraph.css';

const HeroDetails: React.FC<{ id: number }> = ({ id }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);

  useEffect(() => {
    fetchHeroDetails(id).then(async (data) => {
      const heroNode: Node = {
        id: 'hero',
        data: { label: data.name },
        position: { x: 250, y: 5 },
      };

      const filmNodes = await Promise.all(
        data.films.map(async (filmId: number, index: number) => {
          const filmDetails = await fetchFilmDetails(filmId); // Отримуємо деталі фільму
          return {
            id: `film-${filmId}`,
            data: { label: filmDetails.title }, // Відображаємо title фільму
            position: { x: 250, y: 100 + index * 50 },
          };
        })
      );

      const filmEdges = data.films.map((filmId: number) => ({
        id: `edge-hero-film-${filmId}`,
        source: 'hero',
        target: `film-${filmId}`,
      }));

      setNodes([heroNode, ...filmNodes]);
      setEdges(filmEdges);
    });
  }, [id]);

  useEffect(() => {
    if (selectedFilmId !== null) {
      fetchVehiclesByFilm(selectedFilmId).then((data) => {
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

        setNodes((prevNodes) => [...prevNodes, ...vehicleNodes]);
        setEdges((prevEdges) => [...prevEdges, ...vehicleEdges]);
      });
    }
  }, [selectedFilmId]);

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
