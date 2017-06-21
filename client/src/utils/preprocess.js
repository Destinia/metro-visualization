import fs from 'fs';
import parse from 'csv-parse';


const preProcessLine = () => {
  const rawData = require('./rawStation.json'); // eslint-disable-line global-require

  const lines = rawData.features.reduce((prev, val) => {
    if (prev[val.properties['路線名']]) {
      return ({ ...prev, [val.properties['路線名']]: [...prev[val.properties['路線名']], val.properties['中文站名']] });
    }
    return ({ ...prev, [val.properties['路線名']]: [val.properties['中文站名']] });
  }, {});

  const output = Object.keys(lines).reduce((prev, key) => {
    const stations = lines[key];
    const revStations = stations.slice().reverse();

    return ([...prev, stations, revStations]);
  }, []);
  fs.writeFile('stations.json', JSON.stringify(output), 'utf8');
};

const preProcessTravelTime = () => {
  fs.readFile('travelTime.csv', (err, data) => {
    parse(data, { columns: false, trim: true }, (err, rows) => {
      // Your CSV data is in an array of arrys passed to this callback as rows.
      console.log(rows);
    });
  });
};

preProcessLine();
