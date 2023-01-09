const { Router } = require("express");
const { Flight } = require("../models");
const forbiddenError = require("../errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");

const router = new Router();

//create a new flight
router.post("/flight", checkAuth, checkRole({ minRole: checkRole.Roles.pilot }), async (req, res) => {
    const flight = new Flight(req.body);
    flight
        .save()
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            res.sendStatus(422);
            console.log(err);
        });
});

//GET all flight
router.get("/flights", checkAuth, checkRole({ minRole: checkRole.Roles.passenger }), async (req, res) => {
    Flight.findAll({
        where: req.query,
    })
    .then((data) => res.json(data));
});

//GET an flight by id
router.get("/flight/:id", checkAuth, checkRole({ minRole: checkRole.Roles.passenger }), async (req, res) => {
    const flight = await Flight.findByPk(parseInt(req.params.id));
    if (flight) {
        res.json(flight);
    } else {
        res.sendStatus(404);
    }
});

//UPDATE an flight by id
router.put("/flight/:id", checkAuth, checkRole({ minRole: checkRole.Roles.pilot }), async (req, res) => {
    Flight.update(req.body, {
        where: {id: parseInt(req.params.id)},
        individualHooks: true,
    })
    .then(([rowUpdated]) => {
        if(!rowUpdated) {
            return res.sendStatus(404)
        }
        Flight.findByPk(parseInt(req.params.id)).then((flight) => res.json(flight));
    })
    .catch((err) => {
        res.sendStatus(422);
    });
});

//DELETE an flight by id
router.delete("/flight/:id", checkAuth, checkRole({ minRole: checkRole.Roles.pilot }), async (req, res) => {
    Flight.destroy({
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