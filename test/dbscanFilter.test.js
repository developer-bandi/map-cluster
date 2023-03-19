const {
  neighborCheck,
  makeEpsilon,
  gatherCluster,
  dbscanClustring,
  makeAvgInClusters,
  calDist,
} = require("../lib/dbscanFilter");

const mockMapRange = {
  southWest: {
    latitude: 10,
    longitude: 10,
  },
  northEast: {
    latitude: 30,
    longitude: 30,
  },
};

const mockGridSize = { width: 5, height: 5 };

const mockEpsilon = 2;

const mockQueue = [0];

const mockStatus = new Array(4).fill(-1);
mockStatus[0] = 0;
const mockContents = [
  {
    avg: { latitude: 13.5, longitude: 13.5 },
    list: [
      {
        name: "test1",
        latitude: 13,
        longitude: 13,
        level: 2,
      },
      {
        name: "test2",
        latitude: 14,
        longitude: 14,
        level: 1,
      },
    ],
  },
  {
    avg: { latitude: 14.5, longitude: 14.5 },
    list: [
      {
        name: "test3",
        latitude: 14.5,
        longitude: 14.5,
        level: 3,
      },
    ],
  },
  {
    avg: { latitude: 20, longitude: 20 },
    list: [
      {
        name: "test4",
        latitude: 20,
        longitude: 20,
        level: 4,
      },
    ],
  },
  {
    avg: { latitude: 25, longitude: 25 },
    list: [
      {
        name: "test5",
        latitude: 25,
        longitude: 25,
        level: 5,
      },
    ],
  },
];

describe("makeEpsilon function test", () => {
  it("simple case", () => {
    expect(makeEpsilon(mockMapRange, mockGridSize)).toEqual(mockEpsilon);
  });
});

describe("calDist function test", () => {
  it("simple case", () => {
    expect(calDist(4, 1, 5, 1)).toBe(5);
  });
});

describe("neighborCheck function test", () => {
  it("simple case", () => {
    neighborCheck(mockQueue, mockStatus, mockContents, mockEpsilon);
    expect(mockQueue).toEqual([]);
    expect(mockStatus).toEqual([0, 0, -1, -1]);
  });
});

describe("dbscanClustring function test", () => {
  it("simple case", () => {
    expect(dbscanClustring(mockEpsilon, mockContents)).toEqual([0, 0, 1, 2]);
  });
});

describe("gatherCluster function test", () => {
  it("simple case", () => {
    expect(gatherCluster([0, 0, 1, 2], mockContents)).toEqual([
      [mockContents[0], mockContents[1]],
      [mockContents[2]],
      [mockContents[3]],
    ]);
  });
});

describe("makeAvgInClusters function test", () => {
  it("simple case", () => {
    expect(
      makeAvgInClusters([
        [mockContents[0], mockContents[1]],
        [mockContents[2]],
        [mockContents[3]],
      ])
    ).toEqual([
      {
        avg: {
          latitude: 13.833333333333334,
          longitude: 13.833333333333334,
        },
        list: [
          mockContents[0].list[0],
          mockContents[0].list[1],
          mockContents[1].list[0],
        ],
      },
      {
        avg: {
          latitude: 20,
          longitude: 20,
        },
        list: [mockContents[2].list[0]],
      },
      {
        avg: {
          latitude: 25,
          longitude: 25,
        },
        list: [mockContents[3].list[0]],
      },
    ]);
  });
});
