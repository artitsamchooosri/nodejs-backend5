const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('/bi/production_month_account/record_report_as_bi Time: ', Date.now())
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
    "	journalreportas.JOURNALID, \n" +
    "	[tran].DATEEXPECTED, \n" +
    "	journalreportas.PRODID, \n" +
    "	[tran].ITEMID, \n" +
    "	[tran].QTY, \n" +
    "	[tran].UNITID, \n" +
    "	[tran].INVENTBATCHID, \n" +
    "	[tran].INVENTSERIALID, \n" +
    "	[tran].INVENTLOCATIONID, \n" +
    "	[tran].WMSLOCATIONID, \n" +
    "	[tran].VOUCHERPHYSICAL, \n" +
    "	journalreportas.Cline, \n" +
    "	journalreportas.JOURNALTYPE, \n" +
    "	[tran].DATEFINANCIAL, \n" +
    "	[tran].DATEPHYSICAL, \n" +
    "	journalreportas.POSTEDDATETIME, \n" +
    "	GENERALJOURNALENTRY.CREATEDDATETIME\n" +
    "FROM\n" +
    "	(\n" +
    "		SELECT\n" +
    "			INVENTTRANS.DATEEXPECTED, \n" +
    "			INVENTTABLEMODULE.UNITID, \n" +
    "			INVENTDIM.INVENTBATCHID, \n" +
    "			INVENTDIM.INVENTSERIALID, \n" +
    "			INVENTDIM.INVENTLOCATIONID, \n" +
    "			INVENTDIM.WMSLOCATIONID, \n" +
    "			INVENTTRANS.DATEFINANCIAL, \n" +
    "			INVENTTRANS.DATEPHYSICAL, \n" +
    "			INVENTTABLEMODULE.MODULETYPE, \n" +
    "			INVENTTRANS.ITEMID, \n" +
    "			INVENTTRANS.QTY, \n" +
    "			INVENTTRANS.VOUCHERPHYSICAL\n" +
    "		FROM\n" +
    "			dbo.INVENTTRANS\n" +
    "			INNER JOIN\n" +
    "			dbo.INVENTTABLEMODULE\n" +
    "			ON \n" +
    "				INVENTTRANS.ITEMID = INVENTTABLEMODULE.ITEMID\n" +
    "			INNER JOIN\n" +
    "			dbo.INVENTTRANSORIGIN\n" +
    "			ON \n" +
    "				INVENTTRANS.INVENTTRANSORIGIN = INVENTTRANSORIGIN.RECID AND\n" +
    "				INVENTTRANS.PARTITION = INVENTTRANSORIGIN.PARTITION\n" +
    "			INNER JOIN\n" +
    "			dbo.INVENTDIM\n" +
    "			ON \n" +
    "				INVENTTRANS.INVENTDIMID = INVENTDIM.INVENTDIMID\n" +
    "		WHERE\n" +
    "			INVENTTABLEMODULE.MODULETYPE = '0'\n" +
    "	) AS [tran]\n" +
    "	INNER JOIN\n" +
    "	(\n" +
    "		SELECT\n" +
    "			PRODJOURNALTABLE.JOURNALID, \n" +
    "			PRODJOURNALPROD.VOUCHER, \n" +
    "			PRODJOURNALTABLE.JOURNALTYPE, \n" +
    "			COUNT(PRODJOURNALPROD.LINENUM) AS Cline, \n" +
    "			PRODJOURNALTABLE.PRODID, \n" +
    "			PRODJOURNALTABLE.POSTEDDATETIME\n" +
    "		FROM\n" +
    "			dbo.PRODJOURNALPROD\n" +
    "			INNER JOIN\n" +
    "			dbo.PRODJOURNALTABLE\n" +
    "			ON \n" +
    "				PRODJOURNALPROD.JOURNALID = PRODJOURNALTABLE.JOURNALID\n" +
    "		WHERE\n" +
    "			PRODJOURNALTABLE.POSTED = '1'\n" +
    "		GROUP BY\n" +
    "			PRODJOURNALTABLE.JOURNALID, \n" +
    "			PRODJOURNALPROD.VOUCHER, \n" +
    "			PRODJOURNALTABLE.JOURNALTYPE, \n" +
    "			PRODJOURNALTABLE.PRODID, \n" +
    "			PRODJOURNALTABLE.POSTEDDATETIME\n" +
    "	) AS journalreportas\n" +
    "	ON \n" +
    "		[tran].VOUCHERPHYSICAL = journalreportas.VOUCHER\n" +
    "	LEFT JOIN\n" +
    "	dbo.GENERALJOURNALENTRY\n" +
    "	ON \n" +
    "		journalreportas.VOUCHER = GENERALJOURNALENTRY.SUBLEDGERVOUCHER";
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