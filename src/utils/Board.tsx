import React, { ReactNode } from 'react';

interface BoardProps {
  className: string;
  width: number;
  height: number;
  cwidth: number;
  cheight: number;
  margins: number[];
  children?: ReactNode;
}

export const Board = ({
  className = '',
  width = 200,
  height = 200,
  cwidth = 100,
  cheight = height / width,
  margins = [10, 10, 10, 10],
  children,
}: BoardProps) => {
  const containerClassName = className ? `hago ${className}` : `hago`;
  const marginTop = margins[0];
  const marginRight = margins[1];
  const marginBottom = margins[2];
  const marginLeft = margins[3];
  const svgWidth = width - marginLeft - marginRight;
  const svgHeight = height - marginTop - marginBottom;
  const viewBoxWidth = svgWidth + marginLeft + marginRight;
  const viewBoxHeight = svgHeight + marginTop + marginBottom;
  const viewBoxValue = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

  const paddingBottom = `${cwidth * cheight}%`;
  const containerWidth = `${cwidth}%`;
  const containerStyles: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: containerWidth,
    paddingBottom: paddingBottom,
    backgroundColor: 'inherit',
    overflow: 'hidden',
  };
  const svgStyles: React.CSSProperties = {
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    left: 0,
  };
  return (
    <figure className={containerClassName}>
      <div className="hago_svg_container" style={containerStyles}>
        <svg
          style={svgStyles}
          className="hago_svg"
          viewBox={viewBoxValue}
          preserveAspectRatio={'xMinYMin meet'}
        >
          <g
            className="svgElement"
            transform={`translate(${marginLeft}, ${marginTop})`}
          >
            {children}
          </g>
        </svg>
      </div>
    </figure>
  );
};
