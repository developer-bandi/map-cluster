export const makeEpsilon = (mapRange, gridSize) => {
  return (
    (mapRange.northEast.latitude - mapRange.southWest.latitude) /
      gridSize.width /
      4 +
    (mapRange.northEast.longitude - mapRange.southWest.longitude) /
      gridSize.height /
      4
  );
};

export const calDist = (x1, x2, y1, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const neighborCheck = (queue, status, contents, epsilon) => {
  if (queue.length === 0) return 0;
  const index = queue.shift();
  for (let j = 0; j < contents.length; j++) {
    if (status[j] !== -1) continue;
    const dist = calDist(
      contents[index].avg.latitude,
      contents[j].avg.latitude,
      contents[index].avg.longitude,
      contents[j].avg.longitude
    );
    if (dist <= epsilon) {
      queue.push(j);
      status[j] = status[index];
    }
  }
  neighborCheck(queue, status, contents, epsilon);
};

export const dbscanClustring = (epsilon, contents) => {
  const queue = [];
  let clusterLevel = 0;
  const status = new Array(contents.length).fill(-1);
  for (let i = 0; i < contents.length; i++) {
    neighborCheck(queue, status, contents);
    if (status[i] === -1) {
      status[i] = clusterLevel;
      for (let j = 0; j < contents.length; j++) {
        if (status[j] !== -1) continue;
        const dist = calDist(
          contents[i].avg.latitude,
          contents[j].avg.latitude,
          contents[i].avg.longitude,
          contents[j].avg.longitude
        );
        if (dist <= epsilon) {
          queue.push(j);
          status[j] = clusterLevel;
        }
      }
      clusterLevel += 1;
    }
  }
  return status;
};

export const gatherCluster = (status, contents) => {
  const clusters = [];
  status.forEach((state, index) => {
    if (clusters[state] == undefined) {
      clusters[state] = [contents[index]];
    } else {
      clusters[state].push(contents[index]);
    }
  });

  return clusters;
};

export const makeAvgInClusters = (clusteredContents) => {
  return clusteredContents.map((resultList) => {
    const avg = resultList.reduce(
      (prev, cur) => {
        return {
          latitude: prev.latitude + cur.avg.latitude * cur.list.length,
          longitude: prev.longitude + cur.avg.longitude * cur.list.length,
        };
      },
      { latitude: 0, longitude: 0 }
    );
    const list = resultList
      .reduce((prev, cur) => {
        prev.push(cur.list);
        return prev;
      }, [])
      .flat();
    avg.latitude /= list.length;
    avg.longitude /= list.length;
    return { list, avg };
  });
};

const dbscanFilter = (mapRange, gridSize, contents) => {
  const epsilon =
    (mapRange.northEast.latitude - mapRange.southWest.latitude) /
      gridSize.width /
      4 +
    (mapRange.northEast.longitude - mapRange.southWest.longitude) /
      gridSize.height /
      4;

  const status = dbscanClustring(epsilon, contents);
  const clusteredContents = gatherCluster(status, contents);
  return makeAvgInClusters(clusteredContents);
};

export default dbscanFilter;
