const express = require('express')
const router = express.Router()
const db = require('./db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('producname_excel Time: ', Date.now())
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
    "	ECORESPRODUCT.DISPLAYPRODUCTNUMBER, \n" +
    "	ECORESPRODUCTTRANSLATION.NAME, \n" +
    "	ECORESPRODUCTTRANSLATION.DESCRIPTION,\n" +
    "	ECORESPRODUCT.SEARCHNAME, \n" +
    "	ECORESPRODUCT.PRODUCTTYPE, \n" +
    "	ECORESPRODUCT.PDSCWPRODUCT\n" +
    "	\n" +
    "FROM\n" +
    "	dbo.ECORESPRODUCTTRANSLATION\n" +
    "	INNER JOIN\n" +
    "	dbo.ECORESPRODUCT\n" +
    "	ON \n" +
    "	ECORESPRODUCTTRANSLATION.PRODUCT = ECORESPRODUCT.RECID";
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