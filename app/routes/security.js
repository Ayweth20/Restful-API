const { Router } = require('express');
const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = new Router();
const SECRET = process.env.JWT_SECRET || "ybbvibfuyvtyvybnroicnbv";

router.post('/login', async (req, res) => {
    const user = await User.findOne({ 
        where: { 
            email: req.body.email 
        } 
    });

    if (!user) return res.sendStatus(401);

    if(!bcryptjs.compare(req.body.password, user.password)) return res.sendStatus(401);

    res.json({
        token: jwt.sign(
            { 
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            }, 
            SECRET
            ),
    });
});

module.exports = router;