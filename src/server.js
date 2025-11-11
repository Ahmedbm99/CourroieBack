console.log("server started");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: "./.env" });
}

const path = require('path');
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
require("./routes")(app);
app.use('/public', express.static(path.join(__dirname, '../public'), {
    setHeaders: (res, path) => {
      console.log(`Serving static file: ${path}`);
    }
  }));
db.sequelize.sync({ alter: false })
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(` Server running on port ${port}`));
  })
  .catch((error) => {
    console.error(" Database connection failed:", error);
  });

  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});