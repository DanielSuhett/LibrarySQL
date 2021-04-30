const { checkProps, formatResponse } = require("../utils");

module.exports = (app, express) => {
  app.use(express.json());

  app.use("*", (req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
      const props = checkProps(req.body);

      !props
        ? formatResponse(res, 422, {
            success: false,
            message: "Need payload to insert"
          })
        : null;
    }
    next();
  });

  app.use("/category", function (req, res, next) {
    !req.query.category
      ? formatResponse(res, 422, {
          success: false,
          message: "Need payload to insert"
        })
      : null;
    next();
  });

  app.use("*", (req, res, next) => {
    if (process.env.NODE_ENV !== "test") {
      const date = new Date();
      const { method, url } = req;
      console.log(
        `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${method}: ${url}`
      );
    }
    next();
  });
};
