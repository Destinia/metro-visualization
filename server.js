/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxy = require('proxy-middleware');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const config = require('./webpack.config.dev');

const port = process.env.PORT || 3000;
const API_PORT = process.env.API_PORT || 3001;

const app = express();
const dashboard = new Dashboard();
const compiler = webpack(config);


compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(require('webpack-dev-middleware')(compiler, {
  quiet: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {},
}));

app.use('/api', proxy(`http://localhost:${API_PORT}/api`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.dev.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
