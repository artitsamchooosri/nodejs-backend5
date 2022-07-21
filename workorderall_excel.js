const express = require('express')
const router = express.Router()
const db = require('./db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('workorderall_excel Time: ', Date.now())
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next()
})
// define the home page route
router.get('/', (req, res) => {
    var sql = require("mssql");
    var config = db.configdatabesd
    const Q64='U0VMRUNUDQoJUFJPRFRBQkxFLkJPTUlELCANCglQUk9EVEFCTEUuQ09MTEVDVFJFRlBST0RJRCwgDQoJUFJPRFRBQkxFLkRMVkRBVEUsIA0KCVBST0RUQUJMRS5JTlZFTlRESU1JRCwgDQoJUFJPRFRBQkxFLklOVkVOVFJFRlRSQU5TSUQsIA0KCVBST0RUQUJMRS5JVEVNSUQsIA0KCVBST0RUQUJMRS5OQU1FLCANCglQUk9EVEFCTEUuUFJPREdST1VQSUQsIA0KCVBST0RUQUJMRS5QUk9ESUQsIA0KCVBST0RUQUJMRS5QUk9EUE9PTElELCANCglQUk9EVEFCTEUuUFJPRFNUQVRVUywgDQoJUFJPRFRBQkxFLlFUWUNBTEMsIA0KCVBST0RUQUJMRS5SRU1BSU5JTlZFTlRQSFlTSUNBTCwgDQoJUFJPRFRBQkxFLlJPVVRFSUQsIA0KCVBST0RUQUJMRS5QQVJUSVRJT04sIA0KCVBST0RUQUJMRS5SRUNJRCwgDQoJUFJPRFRBQkxFLlJFQ1ZFUlNJT04sIA0KCVBST0RUQUJMRS5DUkVBVEVEREFURVRJTUUsIA0KCVBST0RUQUJMRS5DUkVBVEVEQlkNCkZST00NCglkYm8uUFJPRFRBQkxF'
    const Q =Buffer.from(Q64, 'base64').toString('ascii')
    sql.connect(config, function (err) {
       if (err) console.log(err)
        var request = new sql.Request();
        request.query(Q, function (err, recordset) {
           if (err) console.log(err)
           //res.jsonp(recordset.recordsets[0])
           res.send(recordset.recordsets) 
       });
    });   
    res.setHeader('Content-Type', 'application/json');
})

module.exports = router