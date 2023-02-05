const express = require("express");
const db = require("mongoose");
const dotEnv = require('dotenv');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

dotEnv.config();

// imports
const auth = require("./routes/auth");
const posts = require("./routes/posts");

const app = express();

// connection to the database
db.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log(`Successfully connected to the database..`)
);

// import middlewares
app.use(express.json());
app.use(cors());

// Route middlewares
app.use("/api/users", auth);
app.use("/api/posts", posts);

// start the server
app.listen(PORT, () =>
  console.log(`Server started and running on port ${PORT}`)
);
