const { connect } = require("mongoose");

const password = encodeURIComponent(process.env.DB_PASSWORD);
const DB_URL = `mongodb+srv://keshavdb:${password}@keshav.f1rfheg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

connect(DB_URL)
  .then((data) => {
    console.log("Database connection establish");
  })
  .catch((error) => {
    console.log(`Database connection failed: ${error.message}`);
  });
