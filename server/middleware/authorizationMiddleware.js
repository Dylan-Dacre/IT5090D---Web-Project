const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://api.example.com",
  issuer: "https://example.auth0.com/",
});

module.exports = checkJwt;
