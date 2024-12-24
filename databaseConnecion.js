const mongoose = require('mongoose');

function DbConnection() {
   // Directly set the MongoDB URL
   const DB_URL = 'mongodb+srv://Demodb:Demodb@cluster0.irbs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
   
   console.log("Mongo URL:", DB_URL);  // Debugging line to confirm the connection URL

   mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }).then(() => {
      console.log("DB Connected");
   }).catch((error) => {
      console.error("Connection Error:", error);
   });
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Errors"));
db.once("open", function() {
   console.log("DB Connected");
});

module.exports = DbConnection;
