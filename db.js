var object = {
  user: "results.user",
  password: "results.password",
  server: "results.server",
  database: "results.databasedatabase",
  pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 150000
    }
};

function myFunction(object) {
  const { MongoClient } = require('mongodb');
  const uri = "mongodb+srv://mixser:Mixser021082@cluster0.e7chkb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const record = client.connect(err=>{
        if (err) throw err;
        const dbo = client.db("apiddc");
        dbo.collection("userinfor").findOne({}, function(err, result) {
            if (err) throw err;
            object.user=result.user;
            object.password=result.password;
            object.server=result.server;
            object.database=result.database;
        });
    });
  
  client.close;
  return object;
  
}
const configdatabesd =myFunction(object);

module.exports={configdatabesd}