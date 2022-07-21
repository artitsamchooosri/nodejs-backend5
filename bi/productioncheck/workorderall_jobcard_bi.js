const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('workorderall_jobcard_bi Time: ', Date.now())
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next()
})
// define the home page route
router.get('/', (req, res) => {
    var sql = require("mssql");
    var config = db.configdatabesd
    const Q ="SELECT\n" +
    "	PRODTABLE.BOMID, \n" +
    "	PRODTABLE.COLLECTREFPRODID, \n" +
    "	PRODTABLE.DLVDATE, \n" +
    "	PRODTABLE.INVENTDIMID, \n" +
    "	PRODTABLE.INVENTREFTRANSID, \n" +
    "	PRODTABLE.ITEMID, \n" +
    "	PRODTABLE.NAME, \n" +
    "	PRODTABLE.PRODGROUPID, \n" +
    "	PRODTABLE.PRODID, \n" +
    "	PRODTABLE.PRODPOOLID, \n" +
    "	PRODTABLE.PRODSTATUS, \n" +
    "	PRODTABLE.QTYCALC, \n" +
    "	PRODTABLE.REMAININVENTPHYSICAL, \n" +
    "	PRODTABLE.ROUTEID, \n" +
    "	PRODTABLE.PARTITION, \n" +
    "	PRODTABLE.RECID, \n" +
    "	PRODTABLE.RECVERSION, \n" +
    "	PRODTABLE.CREATEDDATETIME, \n" +
    "	PRODTABLE.CREATEDBY\n" +
    "FROM\n" +
    "	dbo.PRODTABLE";
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