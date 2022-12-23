const { Router } = require("express");
const { User } = require("../models");

const router = new Router();

//POST (create) a new user
router.post("/user", (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            res.sendStatus(422);
        });
});

//GET all users
router.get("/users", (req, res) => {
    User.findAll({
        where: req.query,
        attributes: {exclude: "password"}
    }).then((data) => res.json(data));
});

//GET a user by id
router.get("/user/:id", async (req, res) => {
    const user = await User.findByPk(parseInt(req.params.id), {
        attributes: {exclude: "password"}
    });
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

//UPDATE a user by id
router.put("/user/:id", async (req, res) => {
    User.update(req.body, {
        where: {id: parseInt(req.params.id)},
        individualHooks: true,
    })
    .then(([rowUpdated]) => {
        if(!rowUpdated) {
            return res.sendStatus(404)
        }
        User.findByPk(parseInt(req.params.id), {
            attributes: {exclude: "password"}
        }).then((user) => res.json(user));
    })
    .catch((err) => {
        res.sendStatus(422);
    });
});

//DELETE a user by id
router.delete("/user/:id", async (req, res) => {
    User.destroy({
        where: {id: parseInt(req.params.id)},
    })
    .then((rowDeleted) => {
        if(!rowDeleted) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;