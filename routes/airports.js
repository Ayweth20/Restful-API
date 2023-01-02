const { Router } = require("express");
const { Airport } = require("../models");
const forbiddenError = require("../errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");

const router = new Router();

//POST (create) a new airport
router.post("/airport", checkAuth, checkRole({ minRole: checkRole.Roles.admin }), (req, res) => {
    const airport = new Airport(req.body);
    airport
        .save()
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            res.sendStatus(422);
            console.log(err);
        });
});

//GET all airports
router.get("/airports", (req, res) => {
    Airport.findAll({
        where: req.query,
    })
    .then((data) => res.json(data));
});

//GET an airport by id
router.get("/airport/:id", async (req, res) => {
    const airport = await Airport.findByPk(parseInt(req.params.id));
    if (airport) {
        res.json(airport);
    } else {
        res.sendStatus(404);
    }
});

//UPDATE an airport by id
router.put("/airport/:id", checkAuth, checkRole({ minRole: checkRole.Roles.admin }), async (req, res) => {
    Airport.update(req.body, {
        where: {id: parseInt(req.params.id)},
        individualHooks: true,
    })
    .then(([rowUpdated]) => {
        if(!rowUpdated) {
            return res.sendStatus(404)
        }
        Airport.findByPk(parseInt(req.params.id)).then((airport) => res.json(airport));
    })
    .catch((err) => {
        res.sendStatus(422);
    });
});

//DELETE an airport by id
router.delete("/airport/:id", checkAuth, checkRole({ minRole: checkRole.Roles.admin }), async (req, res) => {
    Airport.destroy({
        where: {id: parseInt(req.params.id)},
    })
    .then((rowDeleted) => {
        if(!rowDeleted) {
            return res.sendStatus(404)
        }
        res.sendStatus(204);
    })
    .catch((err) => {
        res.sendStatus(422);
    });
});

module.exports = router;