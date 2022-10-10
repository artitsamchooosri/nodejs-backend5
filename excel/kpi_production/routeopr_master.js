const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('excel/kpi_production/routeopr_master Time: ', Date.now())
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
    "	ROUTEOPR.ROUTERELATION, \n" +
    "	ROUTEOPR.ITEMRELATION, \n" +
    "	ROUTEOPR.OPRID, \n" +
    "	ROUTE.OPRNUM, \n" +
    "	ROUTE.OPRNUMNEXT,\n" +
    "	ROUTEOPR.SETUPCATEGORYID, \n" +
    "	ROUTEOPR.PROCESSCATEGORYID, \n" +
    "	ROUTEOPR.PROCESSPERQTY, \n" +
    "	ROUTEOPR.PROCESSTIME, \n" +
    "	ROUTEOPR.SETUPTIME, \n" +
    "	ROUTEOPR.TOHOURS, \n" +
    "	ROUTEOPR.WRKCTRIDCOST, \n" +
    "	ROUTEOPR.ATB_MANHOUR, \n" +
    "	ROUTEOPR.ATB_EMPQTY\n" +
    "	\n" +
    "FROM\n" +
    "	dbo.ROUTEOPR\n" +
    "	INNER JOIN\n" +
    "	dbo.ROUTE\n" +
    "	ON \n" +
    "		ROUTEOPR.ROUTERELATION = ROUTE.ROUTEID AND\n" +
    "		ROUTEOPR.OPRID = ROUTE.OPRID\n" +
    "ORDER BY\n" +
    "	ROUTEOPR.ITEMRELATION ASC, \n" +
    "	ROUTEOPR.ROUTERELATION ASC, \n" +
    "	ROUTEOPR.OPRID ASC";
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