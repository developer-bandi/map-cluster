type mapRange = {
  southWest: {
    latitude: number;
    longitude: number;
  };
  northEast: {
    latitude: number;
    longitude: number;
  };
};

type gridSize = {
  width: number;
  height: number;
};

type content = {
  name: string;
  latitude: number;
  longitude: number;
  level: number;
};

type sortCondtionFn = (a: content, b: content) => number | string;
type contents = content[];

type avgListResult = {
  avg: { latitude: number; longitude: number };
  list: content[];
};

type avgListResults = avgListResult[];

declare module "map-cluster" {
  export namespace mapCluster {
    function clustering(
      mapRange: mapRange,
      gridSize: gridSize,
      contents: contents,
      sortCondtionFn: sortCondtionFn
    ): avgListResults;
  }
}
