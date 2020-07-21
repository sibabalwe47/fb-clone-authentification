const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

// const poolData = {
//   userPoolID: process.env.USER_POOL_ID,
//   clientID: process.env.APP_CLIENT_D,
// };

const poolData = {
  UserPoolId: "us-east-2_a07zOo18F",
  ClientId: "5qc9lrgc9ukto3te40s2td2gfu",
};

module.exports = poolData;
