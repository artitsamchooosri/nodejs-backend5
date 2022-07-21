const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('formulaall_bi Time: ', Date.now())
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
    "	bommaster.BOMID, \n" +
    "	bommaster.NAME, \n" +
    "	bommaster.LINENUM, \n" +
    "	bommaster.ITEMID, \n" +
    "	nameproduct.NAME,\n" +
    "	bommaster.BOMQTY, \n" +
    "	bommaster.BOMQTYSERIE, \n" +
    "	bommaster.UNITID, \n" +
    "	bommaster.INVENTDIMID\n" +
    "	\n" +
    "FROM\n" +
    "	(\n" +
    "		SELECT\n" +
    "			BOM.BOMID, \n" +
    "			BOMTABLE.NAME, \n" +
    "			BOM.LINENUM, \n" +
    "			BOM.ITEMID, \n" +
    "			BOM.BOMQTY, \n" +
    "			BOM.BOMQTYSERIE, \n" +
    "			BOM.UNITID, \n" +
    "			BOM.INVENTDIMID, \n" +
    "			BOMTABLE.APPROVED, \n" +
    "			BOMTABLE.APPROVER, \n" +
    "			BOMTABLE.CHECKBOM, \n" +
    "			BOMTABLE.MODIFIEDDATETIME, \n" +
    "			BOMTABLE.MODIFIEDBY\n" +
    "		FROM\n" +
    "			dbo.BOM\n" +
    "			INNER JOIN\n" +
    "			dbo.BOMTABLE\n" +
    "			ON \n" +
    "				BOM.BOMID = BOMTABLE.BOMID\n" +
    "	) AS bommaster\n" +
    "	INNER JOIN\n" +
    "	(\n" +
    "		SELECT\n" +
    "			ECORESPRODUCT.DISPLAYPRODUCTNUMBER, \n" +
    "			ECORESPRODUCTTRANSLATION.NAME, \n" +
    "			ECORESPRODUCTTRANSLATION.DESCRIPTION, \n" +
    "			ECORESPRODUCT.SEARCHNAME, \n" +
    "			ECORESPRODUCT.PRODUCTTYPE, \n" +
    "			ECORESPRODUCT.PDSCWPRODUCT\n" +
    "		FROM\n" +
    "			dbo.ECORESPRODUCTTRANSLATION\n" +
    "			INNER JOIN\n" +
    "			dbo.ECORESPRODUCT\n" +
    "			ON \n" +
    "				ECORESPRODUCTTRANSLATION.PRODUCT = ECORESPRODUCT.RECID\n" +
    "	) AS nameproduct\n" +
    "	ON \n" +
    "		bommaster.ITEMID = nameproduct.DISPLAYPRODUCTNUMBER\n" +
    "WHERE\n" +
    "	bommaster.APPROVED = '1'";
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