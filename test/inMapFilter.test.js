const { default: inMapFilter } = require("../lib/inMapFilter");

const mockMapRange = {
  southWest: {
    latitude: 10,
    longitude: 10,
  },
  northEast: {
    latitude: 20,
    longitude: 20,
  },
};

describe("inMapFilter function test", () => {
  it("southWestEdge case", () => {
    const mockData = [
      {
        name: "southWestEdge",
        latitude: 10,
        longitude: 10,
        level: 1,
      },
    ];
    expect(inMapFilter(mockMapRange, mockData)).toEqual(mockData);
  });

  it("northEastEdge case", () => {
    const mockData = [
      {
        name: "northEastEdge",
        latitude: 20,
        longitude: 20,
        level: 1,
      },
    ];
    expect(inMapFilter(mockMapRange, mockData)).toEqual(mockData);
  });

  it("inner case", () => {
    const mockData = [
      {
        name: "inner",
        latitude: 15,
        longitude: 15,
        level: 1,
      },
    ];
    expect(inMapFilter(mockMapRange, mockData)).toEqual(mockData);
  });

  it("outer case", () => {
    const mockData = [
      {
        name: "inner",
        latitude: 0,
        longitude: 30,
        level: 1,
      },
    ];
    expect(inMapFilter(mockMapRange, mockData)).toEqual([]);
  });
});
