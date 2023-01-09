const { ValidationError } = require("sequelize");
const HttpError = require("../errors/HttpError");

module.exports = function errorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(422).json(
            err.errors.reduce((acc, item) => {
                acc[item.path] = [...(acc[item.path] || []), item.message];
                return acc;
            }, {})
        );
    } else if (err instanceof HttpError) {
        res.sendStatus(err.code);
    } else {
        res.sendStatus(err);
    }
    console.log(err);
};