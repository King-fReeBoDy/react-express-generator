const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const PORT = 8080;

app.use(express.json());
const allowedOrigin = "*";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

const authRoute = require("./routes/authRoute");

app.use("api/auth", authRoute);

app.listen(PORT, () => console.log(`Serving on http:localhost:${PORT}`));
