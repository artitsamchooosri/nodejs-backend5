const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('record_reportaserror_bi Time: ', Date.now())
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
    "	PRODJOURNALPROD.JOURNALID, \n" +
    "	null AS DATEEXPECTED, \n" +
    "	PRODJOURNALPROD.ITEMID, \n" +
    "	null AS GOODQTY, \n" +
    "	null AS UNITID, \n" +
    "	INVENTDIM.INVENTBATCHID, \n" +
    "	INVENTDIM.INVENTSERIALID, \n" +
    "	INVENTDIM.INVENTLOCATIONID, \n" +
    "	INVENTDIM.WMSLOCATIONID, \n" +
    "        null As VOUCHERPHYSICAL,\n" +
    "	null AS Cline, \n" +
    "	PRODJOURNALTABLE.JOURNALTYPE, \n" +
    "	null AS DATEFINANCIAL, \n" +
    "	PRODJOURNALPROD.TRANSDATE AS DATEPHYSICAL, \n" +
    "	PRODJOURNALTABLE.PRODID, \n" +
    "	PRODJOURNALTABLE.PRODID AS REFERENCEID, \n" +
    "	2 AS REFERENCECATEGORY, \n" +
    "	PRODJOURNALPROD.QTYERROR\n" +
    "FROM\n" +
    "	dbo.PRODJOURNALPROD\n" +
    "	INNER JOIN\n" +
    "	dbo.PRODJOURNALTABLE\n" +
    "	ON \n" +
    "		PRODJOURNALPROD.JOURNALID = PRODJOURNALTABLE.JOURNALID\n" +
    "	INNER JOIN\n" +
    "	dbo.INVENTDIM\n" +
    "	ON \n" +
    "		PRODJOURNALPROD.INVENTDIMID = INVENTDIM.INVENTDIMID\n" +
    "WHERE\n" +
    "	PRODJOURNALTABLE.POSTED = '1' AND\n" +
    "	PRODJOURNALPROD.QTYERROR > 0";
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