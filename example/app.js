const { mapCluster } = require("map-cluster");
// or import {mapCluster} = require("map-cluster")

const contents = [
  {
    name: "test1",
    latitude: 35.23376510646796,
    longitude: 129.08482355219004,
    level: 1,
  },
  {
    name: "test2",
    latitude: 35.232861707769004,
    longitude: 129.0849541918258,
    level: 2,
  },
  {
    name: "test3",
    latitude: 35.2319896824481,
    longitude: 129.08483302398716,
    level: 3,
  },
  {
    name: "test4",
    latitude: 35.23085946532313,
    longitude: 129.0845295264027,
    level: 4,
  },
  {
    name: "test5",
    latitude: 35.229618517006685,
    longitude: 129.08359170272243,
    level: 5,
  },
  {
    name: "test6",
    latitude: 35.229359371666824,
    longitude: 129.08424952247552,
    level: 6,
  },
  {
    name: "test7",
    latitude: 35.22928650036631,
    longitude: 129.0832482411839,
    level: 7,
  },
  {
    name: "test8",
    latitude: 35.23331838396311,
    longitude: 129.08616853584613,
    level: 8,
  },
  {
    name: "test9",
    latitude: 35.23272776943132,
    longitude: 129.0859282559945,
    level: 9,
  },
];

const mapRange = {
  southWest: {
    latitude: 35.22922973028808,
    longitude: 129.08078668719386,
  },
  northEast: {
    latitude: 35.23354418154058,
    longitude: 129.0918800734865,
  },
};

const gridSize = { width: 7, height: 5 };

const sortCondtionFn = (a, b) => a.level - b.level;
// use this data to display marker or overlay in map
const clusteredData = mapCluster.clustering(
  mapRange,
  gridSize,
  contents,
  sortCondtionFn
);

/*
exaple return data is..

[
  {
    avg: { latitude: 35.22945250868649, longitude: 129.08341997195316 },
    list: [
      {
        name: "test5",
        latitude: 35.229618517006685,
        longitude: 129.08359170272243,
        level: 5,
      },

      {
        name: "test7",
        latitude: 35.22928650036631,
        longitude: 129.0832482411839,
        level: 7,
      },
    ],
  },
  ...
];
*/
