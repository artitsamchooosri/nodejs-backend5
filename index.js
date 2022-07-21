var express = require('express');
var cors = require('cors')
var app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const record_report_as_error_excel = require('./record_report_as_error_excel')
const record_report_as_excel = require('./record_report_as_excel')
const jobcard_excel = require('./jobcard_excel')
const workorderall_excel = require('./workorderall_excel')
const picking_excel = require('./picking_excel')
const producname_excel = require('./producname_excel')

const record_reportas_bi = require('./bi/productioncheck/record_reportas_bi')
const record_reportaserror_bi = require('./bi/productioncheck/record_reportaserror_bi')
const routmaster_bi = require('./bi/productioncheck/routmaster_bi')
const routeopr_bi = require('./bi/productioncheck/routeopr_bi')
const routejournal_bi = require('./bi/productioncheck/routejournal_bi')
const routejournalline_bi = require('./bi/productioncheck/routejournalline_bi')
const productname_bi = require('./bi/productioncheck/productname_bi')
const recordpickingline_bi = require('./bi/productioncheck/recordpickingline_bi')
const recordpicking_bi = require('./bi/productioncheck/recordpicking_bi')
const formulaall_bi = require('./bi/productioncheck/formulaall_bi')
const workorderall_bi = require('./bi/productioncheck/workorderall_bi')
const workorderall_jobcard_bi = require('./bi/productioncheck/workorderall_jobcard_bi')
const workallorder_checkpick_bi = require('./bi/productioncheck/workallorder_checkpick_bi')

const production_month_account_record_reportas_bi = require('./bi/production_month_account/record_reportas_bi')
const production_month_account_routejournalline_bi = require('./bi/production_month_account/routejournalline_bi')
const production_month_account_recordpickingline_bi = require('./bi/production_month_account/recordpickingline_bi')
const production_month_account_productname_bi = require('./bi/production_month_account/productname_bi')
const production_month_account_workorderall_bi = require('./bi/production_month_account/workorderall_bi')
const production_month_account_record_report_as_bi = require('./bi/production_month_account/record_report_as_bi')
const production_month_account_jobcard_bi = require('./bi/production_month_account/jobcard_bi')
const production_month_account_picking_bi = require('./bi/production_month_account/picking_bi')



app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/record_report_as_error_excel', record_report_as_error_excel)
app.use('/record_report_as_excel', record_report_as_excel)
app.use('/jobcard_excel', jobcard_excel)
app.use('/workorderall_excel', workorderall_excel)
app.use('/picking_excel', picking_excel)
app.use('/producname_excel', producname_excel)
app.use('/record_reportas_bi', record_reportas_bi)
app.use('/record_reportaserror_bi', record_reportaserror_bi)
app.use('/routmaster_bi', routmaster_bi)
app.use('/routeopr_bi', routeopr_bi)
app.use('/routejournal_bi', routejournal_bi)
app.use('/routejournalline_bi', routejournalline_bi)
app.use('/productname_bi', productname_bi)
app.use('/recordpickingline_bi', recordpickingline_bi)
app.use('/recordpicking_bi', recordpicking_bi)
app.use('/formulaall_bi', formulaall_bi)
app.use('/workorderall_bi', workorderall_bi)
app.use('/workorderall_jobcard_bi', workorderall_jobcard_bi)
app.use('/workallorder_checkpick_bi', workallorder_checkpick_bi)

app.use('/bi/production_month_account/record_reportas_bi', production_month_account_record_reportas_bi)
app.use('/bi/production_month_account/routejournalline_bi', production_month_account_routejournalline_bi)
app.use('/bi/production_month_account/recordpickingline_bi', production_month_account_recordpickingline_bi)
app.use('/bi/production_month_account/productname_bi', production_month_account_productname_bi)
app.use('/bi/production_month_account/workorderall_bi', production_month_account_workorderall_bi)
app.use('/bi/production_month_account/record_report_as_bi', production_month_account_record_report_as_bi)
app.use('/bi/production_month_account/jobcard_bi', production_month_account_jobcard_bi)
app.use('/bi/production_month_account/picking_bi', production_month_account_picking_bi)





app.get('/', function (req, res) {
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://mixser:Mixser021082@cluster0.e7chkb1.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err=>{
        if (err) throw err;
        const dbo = client.db("apiddc");
        dbo.collection("userinfor").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result.user);
            
        });
    });
    client.close();
    res.send('About API ')
});
var server = app.listen(3001, function () {
    console.log('run');
});