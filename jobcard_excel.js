const express = require('express')
const router = express.Router()
const db = require('./db')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('jobcard_excel Time: ', Date.now())
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next()
})
// define the home page route
router.get('/', (req, res) => {
    var sql = require("mssql");
    var config = db.configdatabesd
    const Q ="SELECT PRODJOURNALTABLE.PRODID, PRODJOURNALTABLE.JOURNALID, PRODJOURNALTABLE.DESCRIPTION, PRODJOURNALTABLE.JOURNALNAMEID, PRODJOURNALNAME.JOURNALTYPE, PRODJOURNALROUTE.OPRNUM, PRODJOURNALROUTE.OPRID, ROUTEOPRTABLE.NAME, PRODJOURNALROUTE.TRANSDATE, PRODJOURNALROUTE.FROMTIME, PRODJOURNALROUTE.TOTIME, PRODJOURNALROUTE.HOURS, PRODJOURNALROUTE.ATB_MANQTY, PRODJOURNALROUTE.QTYERROR, PRODJOURNALROUTE.QTYGOOD, PRODJOURNALROUTE.QTYPRICE, PRODJOURNALROUTE.ATB_DEGRADE, PRODJOURNALROUTE.ATB_REWORK, PRODJOURNALTABLE.POSTED, PRODJOURNALTABLE.PARTITION, PRODJOURNALTABLE.POSTEDDATETIME FROM dbo.PRODJOURNALNAME INNER JOIN dbo.PRODJOURNALTABLE ON PRODJOURNALNAME.JOURNALNAMEID = PRODJOURNALTABLE.JOURNALNAMEID INNER JOIN dbo.PRODJOURNALROUTE ON PRODJOURNALTABLE.PRODID = PRODJOURNALROUTE.PRODID AND PRODJOURNALTABLE.PARTITION = PRODJOURNALROUTE.PARTITION AND PRODJOURNALTABLE.JOURNALID = PRODJOURNALROUTE.JOURNALID INNER JOIN dbo.ROUTEOPRTABLE ON PRODJOURNALROUTE.OPRID = ROUTEOPRTABLE.OPRID"
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