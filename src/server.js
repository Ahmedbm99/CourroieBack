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
const allowedOrigins = [
  'https://ahmedbm99.github.io',
  'http://localhost:5173',
  '*'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));
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