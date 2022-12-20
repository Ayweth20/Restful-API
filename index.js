const express = require("express");

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("Hello World! Test works");
});


const PORT = process.env.PORT || 1503;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));