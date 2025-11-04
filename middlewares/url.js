import express from "express";
import { getUser } from "../service/auth.js";

function json() {
  return express.json();
}

// Authorization ::

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.token;
  req.user = null;

  if (!token) return next();

  const user = getUser(token);
  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    console.log(req.user);

    if (!req.user) return res.redirect("/api/user/login");
    if (!roles.includes(req.user.role))
      return res.end("You are not allowed to access this resources");
    console.log("User Role : ", req.user.role);

    next();
  };
}

export { json, checkForAuthentication, restrictTo };
