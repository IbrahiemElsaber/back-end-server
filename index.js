const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const movieRoute = require("./routes/movie.route");
const { db } = require("./models/User");

//app

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

const app = express();
//middlewares
// enable cors
app.use(cors());

// helmet for security headers
app.use(helmet());

// cookie parser
app.use(cookieParser());

// json body parser
app.use(express.json());

// prevent xss attack
app.use(xssClean());

// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// prevent http param pollution
app.use(hpp());

//routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
