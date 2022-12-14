import React, { useState, useMemo, useRef, useEffect } from "react";
import { Group } from "@vx/group";
import { GradientOrangeRed, GradientPinkRed } from "@vx/gradient";
import { RectClipPath } from "@vx/clip-path";
import { voronoi, VoronoiPolygon } from "@vx/voronoi";
import { localPoint } from "@vx/event";
import { AllSensorList, useAllSensors } from "@apis/useAllSensor";

type Datum = {
	x: number;
	y: number;
	id: string;
};

const data: Datum[] = new Array(20).fill(null).map(() => ({
	x: Math.random(),
	y: Math.random(),
	id: Math.random().toString(36).slice(2),
}));

const neighborRadius = 75;

const defaultMargin = {
	top: 0,
	left: 0,
	right: 0,
	bottom: 76,
};

export type VoronoiProps = {
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
};

export default ({
	width = window.innerWidth,
	height,
	margin = defaultMargin,
}: VoronoiProps) => {
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const voronoiLayout = useMemo(
		() =>
			voronoi<Datum>({
				x: (d) => d.x * innerWidth,
				y: (d) => d.y * innerHeight,
				width: innerWidth,
				height: innerHeight,
			})(data),
		[innerWidth, innerHeight]
	);

	const polygons = voronoiLayout.polygons();
	const svgRef = useRef<SVGSVGElement>(null);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [neighborIds, setNeighborIds] = useState<Set<string>>(new Set());

	return width < 10 ? null : (
		<svg width={width} height={height} ref={svgRef}>
			<GradientOrangeRed id="voronoi_orange_red" />
			<GradientPinkRed id="voronoi_pink_red" />
			<RectClipPath
				id="voronoi_clip"
				width={innerWidth}
				height={innerHeight}
				rx={14}
			/>
			<Group
				top={margin.top}
				left={margin.left}
				// clipPath="url(#voronoi_clip)"
				onMouseMove={(event) => {
					if (!svgRef.current) return;

					// find the nearest polygon to the current mouse position
					const point = localPoint(svgRef.current, event);
					if (!point) return;

					const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
					// find neighboring polygons to hightlight
					if (closest && closest.data.id !== hoveredId) {
						const neighbors = new Set<string>();
						const cell = voronoiLayout.cells[closest.index];
						if (!cell) return;

						cell.halfedges.forEach((index) => {
							const edge = voronoiLayout.edges[index];
							const { left, right } = edge;
							if (left && left !== closest) neighbors.add(left.data.id);
							else if (right && right !== closest) neighbors.add(right.data.id);
						});

						setNeighborIds(neighbors);
						setHoveredId(closest.data.id);
					}
				}}
				onMouseLeave={() => {
					setHoveredId(null);
					setNeighborIds(new Set());
				}}
			>
				{polygons.map((polygon) => (
					<VoronoiPolygon
						key={`polygon-${polygon.data.id}`}
						polygon={polygon}
						fill={
							// hoveredId &&
							// (polygon.data.id === hoveredId ||
							// 	neighborIds.has(polygon.data.id))
							// 	? "green"
							// 	: "green"
							hoveredId === polygon.data.id ? "green" : "green"
						}
						stroke="#fff"
						strokeWidth={1}
						fillOpacity={hoveredId === polygon.data.id ? 1 : 0.5}
					/>
				))}
				{data.map(({ x, y, id }) => (
					<circle
						key={`circle-${id}`}
						r={5}
						cx={x * innerWidth}
						cy={y * innerHeight}
						fill={"#fff"}
						fillOpacity={0.8}
					/>
				))}
			</Group>
		</svg>
	);
};
