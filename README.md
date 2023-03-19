<div style="text-align:center"><h1>map-cluster</h1>
clustring based map and make result with clustered data</div>

## How to use

Install as project dependency in browser client or node.js server

```
$ npm install map-cluster
```

and use clustering function to clustering data

```javascript
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
```

## API

### clustring(mapRange, gridSize, contents):avgListResult

#### parameter

```typescript
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

type sortCondtionFn = () => number;
```

- mapRange : map size that show in window. southwest is equeal to leftbottom, northEast is equeal to righttop
- gridSize : grid size that divide map to clustring. this size effects to dbscan becuse dbscans eclipse is decided to this size
- content : your overlay or marker info. level is the Priority which is using width sort in cluster
- sortCondtionFn : this fuction make order in cluster.

#### return

```typescript
type avgListResult = {
  avg: { latitude: number; longitude: number };
  list: content[]; // content type is same to parameter
};

type avgListResults = avgListResult[];
```

avg is the avarage position in the list data and list is the data after clustering. content type is same to parameter, so use get the origin content data.

## algorism

clustring function use three filter function. main idea is from [google maps clustering article](http://www.joams.com/uploadfile/2013/0426/20130426033622753.pdf). so if you interested in prinspal, read this.

### inMapFilter

this is simple function. Filter only content within the map. Since this function traverses the element once, the time complexity is O(n).

### gridBaseFilter

After dividing the map into the input size, create a two-dimensional array of the same size and put all elements into the corresponding grid. And to extract the representative position of the grid, the average value is obtained. main operation is to determine which element to put into the corresponding grid and to find the average value for each grid, the time complexity is O(n).

### dbscanFilter

Element by element, it traverses all elements and checks whether they are neighbors to determine clustering, and returns the average value and a list as in the previous function. it traverses all elements element by element, the time complexity is O(n^2). However, since n is the number of lattices, not the number of elements, it is not slow if there are not many grid.

## typescript

The library provides a .d.ts file so that proper type inference can be provided.

## FAQ

### When should I use this library?

It is most appropriate when clustering is provided, such as Kakao Map or Naver Map, but information about the cluster cannot be obtained, and it is also good to use when clustering itself is not provided.

### Server, client, where should I use it?

Since the operation can take quite a long time if there are a lot of elements to be filtered, it is better to operation and download data from the server whenever the map is changed. However, if there is not much data, it is good to perform the operation. because server operation is consider the network request time. Since both can be used, it is better to compare and choose the one that takes less time.

## Contribution & issue

If there are bugs or improvements in the code, please post them on the issue tab or post a pr.
