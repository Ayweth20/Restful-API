const express = require("express");
const usersRouter = require("./routes/users");

const app = express();
app.use(express.json());

app.get("/welcome", (req, res) => {
  res.json("Hello ! \\n Welcome to the Restful API of GRISVAL Thibault, BOUCHET Robin and GUERIN Antoine.");
});

app.get("/newyear", (req, res) => {
  res.json("🎉 Happy new year ! 🎉 \\n This endpoint is useless, but we wanted to wish you a happy new year 🥳️");
});

app.use(usersRouter);

const PORT = process.env.PORT || 1503;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));