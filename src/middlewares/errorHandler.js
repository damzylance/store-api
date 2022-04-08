const errorHandler = (err, req, res, next) => {
  return res
    .status(err.status ? err.status : 500)
    .json({ success: false, message: err.message });
};

module.exports = errorHandler;
