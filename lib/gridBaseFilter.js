export const caculateGap = (mapRange, gridSize) => {
  const { northEast, southWest } = mapRange;
  const widthGap = (northEast.longitude - southWest.longitude) / gridSize.width;
  const heightGap = (northEast.latitude - southWest.latitude) / gridSize.height;

  return { widthGap, heightGap };
};

export const classifiContentsToGrid = (
  mapRange,
  gridSize,
  widthGap,
  heightGap,
  contents
) => {
  const grid = new Array(gridSize.height)
    .fill(0)
    .map(() => new Array(gridSize.width).fill(0).map(() => []));

  contents.forEach((content) => {
    const x = Math.min(
      gridSize.width - 1,
      Math.floor((content.longitude - mapRange.southWest.longitude) / widthGap)
    );
    const y = Math.min(
      gridSize.height - 1,
      Math.floor((content.latitude - mapRange.southWest.latitude) / heightGap)
    );
    grid[y][x].push(content);
  });

  return grid;
};

export const makeGridAvgPosition = (markerGrid, sortCondtionFn) => {
  return markerGrid
    .map((row) => {
      return row
        .filter((markers) => markers.length !== 0)
        .map((markers) => {
          let avg = markers.reduce(
            (prev, cur) => {
              return {
                latitude: prev.latitude + cur.latitude / markers.length,
                longitude: prev.longitude + cur.longitude / markers.length,
              };
            },
            { latitude: 0, longitude: 0 }
          );
          markers.sort(sortCondtionFn);
          return { avg, list: markers };
        });
    })
    .flat();
};

const GridBaseFilter = (mapRange, gridSize, contents, sortCondtionFn) => {
  const { widthGap, heightGap } = caculateGap(mapRange, gridSize);
  const markerGrid = classifiContentsToGrid(
    mapRange,
    gridSize,
    widthGap,
    heightGap,
    contents
  );

  return makeGridAvgPosition(markerGrid, sortCondtionFn);
};

export default GridBaseFilter;
