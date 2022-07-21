const express = require('express')
const router = express.Router()
const db = require('../../db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('/bi/production_month_account/routejournalline_bi Time: ', Date.now())
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
    "	PRODJOURNALTABLE.PRODID, \n" +
    "	PRODJOURNALTABLE.JOURNALID, \n" +
    "	PRODJOURNALTABLE.DESCRIPTION, \n" +
    "	PRODJOURNALTABLE.JOURNALNAMEID, \n" +
    "	PRODJOURNALNAME.JOURNALTYPE, \n" +
    "	PRODJOURNALROUTE.OPRNUM, \n" +
    "	PRODJOURNALROUTE.OPRID, \n" +
    "	ROUTEOPRTABLE.NAME, \n" +
    "	PRODJOURNALROUTE.TRANSDATE, \n" +
    "	PRODJOURNALROUTE.FROMTIME, \n" +
    "	PRODJOURNALROUTE.TOTIME, \n" +
    "	PRODJOURNALROUTE.HOURS, \n" +
    "	PRODJOURNALROUTE.ATB_MANQTY, \n" +
    "	PRODJOURNALROUTE.QTYERROR, \n" +
    "	PRODJOURNALROUTE.QTYGOOD, \n" +
    "	PRODJOURNALROUTE.QTYPRICE, \n" +
    "	PRODJOURNALROUTE.ATB_DEGRADE, \n" +
    "	PRODJOURNALROUTE.ATB_REWORK, \n" +
    "	PRODJOURNALTABLE.POSTED, \n" +
    "	PRODJOURNALTABLE.PARTITION\n" +
    "FROM\n" +
    "	dbo.PRODJOURNALNAME\n" +
    "	INNER JOIN\n" +
    "	dbo.PRODJOURNALTABLE\n" +
    "	ON \n" +
    "		PRODJOURNALNAME.JOURNALNAMEID = PRODJOURNALTABLE.JOURNALNAMEID\n" +
    "	INNER JOIN\n" +
    "	dbo.PRODJOURNALROUTE\n" +
    "	ON \n" +
    "		PRODJOURNALTABLE.PRODID = PRODJOURNALROUTE.PRODID AND\n" +
    "		PRODJOURNALTABLE.PARTITION = PRODJOURNALROUTE.PARTITION AND\n" +
    "		PRODJOURNALTABLE.JOURNALID = PRODJOURNALROUTE.JOURNALID\n" +
    "	INNER JOIN\n" +
    "	dbo.ROUTEOPRTABLE\n" +
    "	ON \n" +
    "		PRODJOURNALROUTE.OPRID = ROUTEOPRTABLE.OPRID";
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