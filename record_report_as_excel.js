const express = require('express')
const router = express.Router()
const db = require('./db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('record_report_as_excel Time: ', Date.now())
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next()
})
// define the home page route
router.get('/', (req, res) => {
    var sql = require("mssql");
    var config = db.configdatabesd
    const Q ="SELECT journalreportas.JOURNALID, [tran].DATEEXPECTED, [tran].ITEMID, [tran].QTY, [tran].UNITID, [tran].INVENTBATCHID, [tran].INVENTSERIALID, [tran].INVENTLOCATIONID, [tran].WMSLOCATIONID, [tran].VOUCHERPHYSICAL, journalreportas.Cline, journalreportas.JOURNALTYPE, [tran].DATEFINANCIAL, [tran].DATEPHYSICAL, journalreportas.PRODID, [tran].REFERENCEID, [tran].REFERENCECATEGORY, journalreportas.POSTEDDATETIME FROM ( SELECT INVENTTRANS.DATEEXPECTED, INVENTTABLEMODULE.UNITID, INVENTDIM.INVENTBATCHID, INVENTDIM.INVENTSERIALID, INVENTDIM.INVENTLOCATIONID, INVENTDIM.WMSLOCATIONID, INVENTTRANS.DATEFINANCIAL, INVENTTRANS.DATEPHYSICAL, INVENTTABLEMODULE.MODULETYPE, INVENTTRANS.ITEMID, INVENTTRANS.QTY, INVENTTRANS.VOUCHERPHYSICAL, INVENTTRANSORIGIN.REFERENCEID, INVENTTRANSORIGIN.REFERENCECATEGORY FROM dbo.INVENTTRANS INNER JOIN dbo.INVENTTABLEMODULE ON INVENTTRANS.ITEMID = INVENTTABLEMODULE.ITEMID INNER JOIN dbo.INVENTTRANSORIGIN ON INVENTTRANS.INVENTTRANSORIGIN = INVENTTRANSORIGIN.RECID AND INVENTTRANS.PARTITION = INVENTTRANSORIGIN.PARTITION INNER JOIN dbo.INVENTDIM ON INVENTTRANS.INVENTDIMID = INVENTDIM.INVENTDIMID WHERE INVENTTABLEMODULE.MODULETYPE = '0' AND INVENTTRANS.DATEPHYSICAL <> '1900-01-01 00:00:00.000' ) AS [tran] LEFT JOIN ( SELECT PRODJOURNALTABLE.JOURNALID, PRODJOURNALPROD.VOUCHER, PRODJOURNALTABLE.JOURNALTYPE, COUNT(PRODJOURNALPROD.LINENUM) AS Cline, PRODJOURNALTABLE.PRODID, MAX(PRODJOURNALTABLE.POSTEDDATETIME) AS POSTEDDATETIME FROM dbo.PRODJOURNALPROD INNER JOIN dbo.PRODJOURNALTABLE ON PRODJOURNALPROD.JOURNALID = PRODJOURNALTABLE.JOURNALID WHERE PRODJOURNALTABLE.POSTED = '1' GROUP BY PRODJOURNALTABLE.JOURNALID, PRODJOURNALPROD.VOUCHER, PRODJOURNALTABLE.JOURNALTYPE, PRODJOURNALTABLE.PRODID ) AS journalreportas ON [tran].VOUCHERPHYSICAL = journalreportas.VOUCHER WHERE [tran].REFERENCECATEGORY = '2'"
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