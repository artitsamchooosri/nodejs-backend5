const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('excel/kpi_production/wrkctrresourcegroup Time: ', Date.now())
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
    "	WRKCTRRESOURCEGROUP.PRODUNITID, \n" +
    "	WRKCTRRESOURCEGROUP.SITEID, \n" +
    "	WRKCTRRESOURCEGROUP.WRKCTRID, \n" +
    "	WRKCTRTABLE.NAME, \n" +
    "	WRKCTRRESOURCEGROUP.RECID\n" +
    "FROM\n" +
    "	dbo.WRKCTRRESOURCEGROUP\n" +
    "	INNER JOIN\n" +
    "	dbo.WRKCTRTABLE\n" +
    "	ON \n" +
    "		WRKCTRRESOURCEGROUP.WRKCTRID = WRKCTRTABLE.WRKCTRID";
    //console.log(Q);
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