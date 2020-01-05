require('dotenv').config();

module.exports = (app) => {
  app.listen(process.env.PORT_API, () => {
    console.log(`Server on ${process.env.PORT_API}`)
  });
}