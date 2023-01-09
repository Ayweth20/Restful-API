const ForbiddenError = require('../errors/ForbiddenError');

const Roles = {
    passenger: 0,
    pilot: 1,
    admin: 2
};

function checkRole({ minRole }) {
    return function checkRoleMiddleware(req, res, next) {
        const userRole = req.user.role;

        if (Roles[userRole] >= minRole) {
            next();
        } else {
            throw new ForbiddenError();
        }
    };
}

checkRole.Roles = Roles;

module.exports = checkRole;