const ExpressError = require('./utils/ExpressError');



module.exports = (err, req, res, next) => {
    const { statusCode = 500 } = err;
    err.status = err.status || 'error';
    if (!err.message) {
        err.message = 'Oh no, Something went wrong!';
    }
    res.status(statusCode).json({
        status: err.status,
        messsage: err.message,
        stack: err.stack
    });
}
