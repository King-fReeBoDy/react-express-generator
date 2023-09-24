export const server = `
const express = require("express");
const app = express();
const PORT = 8080;

//using underscore to ignore the req
//you can actual use "req" only
app.get("/", (_req, res) => {
  res.send("Awesome api");
});

app.listen(PORT, console.log(\`Serving on http://localhost:\${PORT}\`));
`;
