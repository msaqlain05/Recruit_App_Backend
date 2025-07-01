// utils/response.js

exports.sendSuccess = (res, data = {}, message = 'Success', status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

exports.sendError = (res, error, status = 500) => {
  const message = error.message || 'Internal Server Error';
  return res.status(status).json({
    success: false,
    message
  });
};
