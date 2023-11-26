const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://xxx.co.nz",
  issuer: "https://dev-gx32ay1mp1zopqmb.us.auth0.com",
});

module.exports = { checkJwt };
