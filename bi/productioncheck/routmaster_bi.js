const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('routmaster_bi Time: ', Date.now())
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
    "	ROUTETABLE.ROUTEID, \n" +
    "	ROUTETABLE.NAME, \n" +
    "	ROUTE.OPRNUM, \n" +
    "	ROUTE.OPRID, \n" +
    "	ROUTEOPRTABLE.NAME AS Name_OPR, \n" +
    "	ROUTE.OPRNUMNEXT, \n" +
    "	ROUTE.OPRPRIORITY, \n" +
    "	ROUTETABLE.APPROVED\n" +
    "FROM\n" +
    "	dbo.ROUTETABLE\n" +
    "	INNER JOIN\n" +
    "	dbo.ROUTE\n" +
    "	ON \n" +
    "		ROUTETABLE.ROUTEID = ROUTE.ROUTEID\n" +
    "	INNER JOIN\n" +
    "	dbo.ROUTEOPRTABLE\n" +
    "	ON \n" +
    "		ROUTE.OPRID = ROUTEOPRTABLE.OPRID\n" +
    "WHERE\n" +
    "	ROUTETABLE.APPROVED = '1'";
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