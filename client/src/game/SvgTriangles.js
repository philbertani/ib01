import React from "react";

const commonStyle = {position:"absolute"};

const fillPct = "95%";

export function RightTriangleLowerLeft({ color }) {
  //whatever is in the viewBox gets scaled to % of container - nice!
  return (
    <svg style={commonStyle} width={fillPct} viewBox="0 0 200 200">
      <polygon
        points="0,0 0,200 200,200"
        style={{ fill: color, stroke: "purple", strokeWidth: 1 }}
      />
    </svg>
  );
}

export function RightTriangleUpperRight({ color }) {
  return (
    <svg style={commonStyle} width={fillPct}  viewBox="0 0 200 200">
      <polygon
        points="0,0 200,200 200,0"
        style={{ fill: color, stroke: "purple", strokeWidth: 1 }}
      />
    </svg>
  );
}

export function RightTriangleUpperLeft({ color }) {
  return (
    <svg style={commonStyle} width={fillPct}  viewBox="0 0 200 200">
      <polygon
        points="0,0 200,0 0,200"
        style={{ fill: color, stroke: "purple", strokeWidth: 1 }}
      />
    </svg>
  );
}

export function Left({ color }) {
  return (
    <svg style={commonStyle}  width={fillPct}  viewBox="0 0 200 200">
      <polygon
        points="0,0 0,200 100,100"
        style={{ fill: color, stroke: "purple", strokeWidth: 1 }}
      />
    </svg>
  );
}

export function Right({ color }) {
  return (
    <svg style={commonStyle} width={fillPct}  viewBox="0 0 200 200">
      <polygon
        points="200,0 200,200 100,100"
        style={{ fill: color, stroke: "purple", strokeWidth: 1 }}
      />
    </svg>
  );
}

export function Up({ color }) {
  return (
    <svg style={commonStyle} width={fillPct}  viewBox="0 0 200 200">
      <polygon
        points="0,0 200,0 100,100"
        style={{ fill: color, stroke: "purple", strokeWidth: 1 }}
      />
    </svg>
  );
}

export function Down({ color }) {
  return (
    <svg style={commonStyle}  width={fillPct} viewBox="0 0 200 200">
      <polygon
        points="0,200 200,200 100,100"
        style={{ fill: color, stroke: "purple", strokeWidth: 1 }}
      />
    </svg>
  );
}

