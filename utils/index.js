exports.checkProps = (body) =>
  ["bar_code", "name", "quantity", "category"].every((prop) =>
    Object.prototype.hasOwnProperty.call(body, prop)
  );

exports.Date = () => new Date(new Date() - 3600 * 1000 * 3).toISOString();

exports.formatResponse = (res, status, body) => res.status(status).json(body);
