const express = require("express");
const amazoncognitoidentity = require("amazon-cognito-identity-js");
const cognitouserpool = amazoncognitoidentity.CognitoUserPool;
const aws = require("aws-sdk");
const request = require("request");
const jwttopem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
global.fetch = require("node-fetch");
const poolData = require("../utils/poolData");
// Init User Pool

const userPool = new amazoncognitoidentity.CognitoUserPool(poolData);

// Register user

exports.userRegister = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const attributeList = [];

    attributeList.push(
      new amazoncognitoidentity.CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );

    await userPool.signUp(
      email,
      password,
      attributeList,
      null,
      (error, response) => {
        if (error) {
          console.log(error);
          res.json({ error: error.message });
        } else {
          res.json(response);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

// Login User

exports.userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const authenticationDetails = new amazoncognitoidentity.AuthenticationDetails(
    {
      Username: email,
      Password: password,
    }
  );

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const user = new amazoncognitoidentity.CognitoUser(userData);

  user.authenticateUser(authenticationDetails, {
    onSuccess: (res) => {
      res.json(res);
    },
    onFailure: (err) => {
      res.json({ error: err });
    },
  });
};
