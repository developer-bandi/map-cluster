const inMapFilter = (mapRange, contents) => {
  return contents.filter(({ latitude, longitude }) => {
    if (
      latitude >= mapRange.southWest.latitude &&
      latitude <= mapRange.northEast.latitude &&
      longitude >= mapRange.southWest.longitude &&
      longitude <= mapRange.northEast.longitude
    ) {
      return true;
    }
    return false;
  });
};

export default inMapFilter;
