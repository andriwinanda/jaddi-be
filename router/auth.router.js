const express = require( 'express' )
const basicAuth = require('express-basic-auth')
const controller = require( "../services/auth.service" )


const routes = express.Router()

routes.use(basicAuth({
  users: { 'jaddi-client' : 'jaddi-secret' },
  unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
  return req.auth
      ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
      : 'No credentials provided'
}

routes.post( "/token", controller.signin )  
routes.post( "/signup", controller.signup )


module.exports = routes