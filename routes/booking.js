const { Router } = require("express");
const { Booking } = require("../models");

const router = new Router();

//create a new booking
router.post("/booking", (req, res) => {
    const booking = new Booking(req.body);
    booking
        .save()
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            //res.sendStatus(422);
            console.log(err);
        });
});

//GET all bookings
router.get("/bookings", (req, res) => {
    Booking.findAll({
        where: req.query,
    })
    .then((data) => res.json(data));
});

//GET an booking by id
router.get("/booking/:id", async (req, res) => {
    const booking = await Booking.findByPk(parseInt(req.params.id));
    if (booking) {
        res.json(booking);
    } else {
        res.sendStatus(404);
    }
});

//UPDATE an booking by id
router.put("/booking/:id", async (req, res) => {
    Booking.update(req.body, {
        where: {id: parseInt(req.params.id)},
        individualHooks: true,
    })
    .then(([rowUpdated]) => {
        if(!rowUpdated) {
            return res.sendStatus(404)
        }
        Booking.findByPk(parseInt(req.params.id)).then((booking) => res.json(booking));
    })
    .catch((err) => {
        res.sendStatus(422);
    });
});

//DELETE an booking by id
router.delete("/booking/:id", async (req, res) => {
    Booking.destroy({
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
