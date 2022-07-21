const express = require('express')
const router = express.Router()
const db = require('./db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('record_report_as_error_excel Time: ', Date.now())
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next()
})
// define the home page route
router.get('/', (req, res) => {
    var sql = require("mssql");
    var config = db.configdatabesd
    const Q ="SELECT PRODJOURNALPROD.JOURNALID, null AS DATEEXPECTED, PRODJOURNALPROD.ITEMID, null AS GOODQTY, null AS UNITID, INVENTDIM.INVENTBATCHID, INVENTDIM.INVENTSERIALID, INVENTDIM.INVENTLOCATIONID, INVENTDIM.WMSLOCATIONID, null AS VOUCHERPHYSICAL, null AS Cline, PRODJOURNALTABLE.JOURNALTYPE, null AS DATEFINANCIAL, PRODJOURNALPROD.TRANSDATE AS DATEPHYSICAL, PRODJOURNALTABLE.PRODID, PRODJOURNALTABLE.PRODID AS REFERENCEID, 2 AS REFERENCECATEGORY, PRODJOURNALPROD.QTYERROR, PRODJOURNALTABLE.POSTEDDATETIME FROM dbo.PRODJOURNALPROD INNER JOIN dbo.PRODJOURNALTABLE ON PRODJOURNALPROD.JOURNALID = PRODJOURNALTABLE.JOURNALID INNER JOIN dbo.INVENTDIM ON PRODJOURNALPROD.INVENTDIMID = INVENTDIM.INVENTDIMID WHERE PRODJOURNALTABLE.POSTED = '1' AND PRODJOURNALPROD.QTYERROR > 0"
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