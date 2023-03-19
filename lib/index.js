import dbscanFilter from "./dbscanFilter";
import GridBaseFilter from "./gridBaseFilter";
import inMapFilter from "./inMapFilter";

export const clustering = (mapRange, gridSize, contents, sortCondtionFn) => {
  const innterMapData = inMapFilter(mapRange, contents);
  const gridBaseFilteredData = GridBaseFilter(
    mapRange,
    gridSize,
    innterMapData,
    sortCondtionFn
  );
  const dbascanResult = dbscanFilter(mapRange, gridSize, gridBaseFilteredData);
  return dbascanResult;
};
