export const serverfile = `
const express = require("express");
const app = express();
const PORT = 8080


app.get((req, res) => {
  res.send("Awesome api!");
});


app.listen(PORT,()=>console.log(\`Serving on http://localhost:\${PORT}\`))
`;
