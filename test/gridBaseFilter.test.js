const {
  caculateGap,
  classifiContentsToGrid,
  makeGridAvgPosition,
} = require("../lib/gridBaseFilter");

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

const mockGap = {
  widthGap: 4,
  heightGap: 4,
};

const mockContents = [
  {
    name: "test1",
    latitude: 12,
    longitude: 12,
    level: 3,
  },
  {
    name: "test2",
    latitude: 13,
    longitude: 13,
    level: 1,
  },
  {
    name: "test3",
    latitude: 12,
    longitude: 16,
    level: 2,
  },
];

const mockClassifiContentsToGrid = new Array(5)
  .fill(0)
  .map(() => new Array(5).fill(0).map(() => []));

mockClassifiContentsToGrid[0][0].push(mockContents[0]);
mockClassifiContentsToGrid[0][0].push(mockContents[1]);
mockClassifiContentsToGrid[0][1].push(mockContents[2]);

const MockmakeGridAvgPosition = [
  {
    avg: {
      latitude: 12.5,
      longitude: 12.5,
    },
    list: [mockContents[1], mockContents[0]],
  },
  {
    avg: {
      latitude: 12,
      longitude: 16,
    },
    list: [mockContents[2]],
  },
];

const mockSortConditionFn = (a, b) => a.level - b.level;

describe("caculateGap function test", () => {
  it("simple case", () => {
    expect(caculateGap(mockMapRange, mockGridSize)).toEqual(mockGap);
  });
});

describe("classifiContentsToGrid function test", () => {
  it("simple case", () => {
    expect(
      classifiContentsToGrid(
        mockMapRange,
        mockGridSize,
        mockGap.widthGap,
        mockGap.heightGap,
        mockContents
      )
    ).toEqual(mockClassifiContentsToGrid);
  });
});

describe("classifiContentsToGrid function test", () => {
  it("simple case", () => {
    expect(
      makeGridAvgPosition(mockClassifiContentsToGrid, mockSortConditionFn)
    ).toEqual(MockmakeGridAvgPosition);
  });
});
