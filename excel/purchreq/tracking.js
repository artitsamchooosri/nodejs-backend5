const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('/excel/purchreq/tracking Time: ', Date.now())
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
    "	PURCHREQTABLE.PURCHREQID, \n" +
    "	PURCHREQLINE.LINENUM, \n" +
    "	PURCHREQTABLE.PURCHREQNAME, \n" +
    "	PURCHREQLINE.ITEMID, \n" +
    "	PURCHREQLINE.ITEMIDNONCATALOG, \n" +
    "	PURCHREQLINE.PURCHQTY, \n" +
    "	UNITOFMEASURE.SYMBOL, \n" +
    "	PURCHREQLINE.PURCHPRICE, \n" +
    "	PURCHREQLINE.NAME, \n" +
    "	PURCHREQLINE.REQUIREDDATE, \n" +
    "	PURCHREQLINE.TRANSDATE, \n" +
    "	PURCHREQLINE.VENDACCOUNT, \n" +
    "	PURCHREQLINE.RECEIVINGOPERATINGUNIT, \n" +
    "	WORKFLOWTRACKINGTABLE.USER_, \n" +
    "	WORKFLOWTRACKINGTABLE.CREATEDDATETIME,\n" +
    "	PURCHREQTABLE.SUBMITTEDBY, \n" +
    "	PURCHREQTABLE.SUBMITTEDDATETIME\n" +
    "	\n" +
    "FROM\n" +
    "	dbo.PURCHREQLINE\n" +
    "	INNER JOIN\n" +
    "	dbo.PURCHREQTABLE\n" +
    "	ON \n" +
    "		PURCHREQLINE.PURCHREQTABLE = PURCHREQTABLE.RECID\n" +
    "	LEFT JOIN\n" +
    "	dbo.UNITOFMEASURE\n" +
    "	ON \n" +
    "		PURCHREQLINE.PURCHUNITOFMEASURE = UNITOFMEASURE.RECID\n" +
    "	INNER JOIN\n" +
    "	dbo.WORKFLOWTRACKINGSTATUSTABLE\n" +
    "	ON \n" +
    "		PURCHREQTABLE.RECID = WORKFLOWTRACKINGSTATUSTABLE.CONTEXTRECID\n" +
    "	INNER JOIN\n" +
    "	dbo.WORKFLOWTRACKINGTABLE\n" +
    "	ON \n" +
    "		WORKFLOWTRACKINGSTATUSTABLE.RECID = WORKFLOWTRACKINGTABLE.WORKFLOWTRACKINGSTATUSTABLE\n" +
    "WHERE\n" +
    "	WORKFLOWTRACKINGSTATUSTABLE.CONTEXTTABLEID = '20622' AND\n" +
    "	WORKFLOWTRACKINGTABLE.TRACKINGTYPE = '4'";
    console.log(Q);
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