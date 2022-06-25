/// <reference types="react" />
export declare function Plot3D({ cameraParams, z, segments, xMin, gridColor, xMax, xRange, yMin, yMax, yRange, scale, size, }: {
    cameraParams?: {
        fov: number;
        position: number[];
        near: number;
        far: number;
    };
    z?: (x: any, y: any) => number;
    segments?: number;
    xMin?: number;
    gridColor?: string;
    xMax?: number;
    xRange?: number;
    yMin?: number;
    yMax?: number;
    yRange?: number;
    scale?: number;
    size?: number[];
}): JSX.Element;
