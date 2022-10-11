const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('/excel/purchreq/poall Time: ', Date.now())
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
    "	PURCHTABLE.ORDERACCOUNT, \n" +
    "	PURCHTABLE.ACCOUNTINGDATE, \n" +
    "	PURCHTABLE.INVOICEACCOUNT, \n" +
    "	PURCHTABLE.ITEMBUYERGROUPID, \n" +
    "	PURCHTABLE.PURCHASETYPE, \n" +
    "	PURCHTABLE.PURCHID, \n" +
    "	PURCHTABLE.PURCHNAME, \n" +
    "	PURCHTABLE.PURCHSTATUS AS StatusPO,\n" +
    "	PURCHLINE.ITEMID, \n" +
    "	PURCHLINE.NAME, \n" +
    "	PURCHLINE.PURCHSTATUS AS StatusLine, \n" +
    "	PURCHLINE.QTYORDERED, \n" +
    "	PURCHLINE.PURCHQTY, \n" +
    "	PURCHLINE.REMAINPURCHPHYSICAL, \n" +
    "	PURCHLINE.PURCHPRICE, \n" +
    "	PURCHLINE.LINEAMOUNT, \n" +
    "	PURCHLINE.PURCHUNIT, \n" +
    "	PURCHLINE.DELIVERYDATE, \n" +
    "	PURCHLINE.MODIFIEDDATETIME, \n" +
    "	PURCHLINE.CREATEDDATETIME\n" +
    "FROM\n" +
    "	dbo.PURCHTABLE\n" +
    "	INNER JOIN\n" +
    "	dbo.PURCHLINE\n" +
    "	ON \n" +
    "		PURCHTABLE.PURCHID = PURCHLINE.PURCHID";
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