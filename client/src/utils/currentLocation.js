import moment from 'moment';

import stations from './stations';
import stopTime from './stopTime';
import travelTime from './travelTime';
import geoStations from '../../../data/stations';

const queryLine = (station, destination) => {
  const result = stations.filter(l => l[l.length - 1] === destination)
    .filter(l => l.indexOf(station) !== -1);
  if (result) {
    return result[0];
  }
  console.error('line not found', station, destination);
  return result;
};

const queryLocation = (startStation, destination, updateTime) => {
  let timeInterval = moment().unix() - moment(updateTime).unix();
  const line = queryLine(startStation, destination);
  if (!line) {
    return [];
  }
  let curStation = startStation;
  while (curStation !== line[line.length - 1]) {
    timeInterval -= stopTime[curStation];
    const nextStation = line[line.findIndex(s => s === curStation) + 1];
    const tripTime = travelTime[curStation + nextStation];
    if (timeInterval > tripTime) {
      curStation = nextStation;
      timeInterval -= tripTime;
      continue; // eslint-disable-line
    } else if (timeInterval > 0) {
      const intervalRatio = timeInterval / tripTime;
      const curLine = geoStations[curStation + nextStation];
      if (!curLine) {
        console.error(curStation, nextStation, line);
      }
      const stationRatio = (curLine.length - 1) * intervalRatio;
      const extendRatio = stationRatio - Math.floor(stationRatio);
      const startPoint = curLine[Math.floor(stationRatio)];
      const endPoint = curLine[Math.ceil(stationRatio)];
      const curLocation = [startPoint[0] + ((endPoint[0] - startPoint[0]) * extendRatio),
        startPoint[1] + ((endPoint[1] - startPoint[1]) * extendRatio)];
      return curLocation;
    }
    return geoStations[curStation + nextStation][0];
  }
  const destSeg = geoStations[line[line.length - 2] + curStation];
  return destSeg[destSeg.length - 1]; // return destination
};

export default queryLocation;
