// server.js
const egg = require('egg')
const config = require('./config.js')

// const workers = Number(process.argv[2] || require('os').cpus().length)
egg.startCluster({
  workers: 1,
  baseDir: __dirname,
  port: config.PORT
})
