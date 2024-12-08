const express = require( 'express' )
const jwt = require( "jsonwebtoken" )
const router = express.Router()
const config = require( "../auth.config" )
const authHandler = require( '../services/auth.service' )
const NewsRouter = require( './news.router' )
// const LocationRouter = require( './location.router' )
const BrandRouter = require( './brand.router' )
const SubscriberRouter = require( './subscriber.router' )
const ProductRouter = require( './product.router' )
const CountryRouter = require( './country.router' )
const CategoryRouter = require( './category.router' )
const UserRouter = require( './user.router' )
const UploadRouter = require( './upload.router' )
const Auth = require( './auth.router' )


router.use( function ( req, res, next )
{
  if ( req.headers && req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer' )
  {
    jwt.verify( req.headers.authorization.split( ' ' )[ 1 ], config.secret, function ( err, decode )
    {
      if ( err ) req.user = undefined
      req.user = decode
      next()
    } )
  } else
  {
    req.user = undefined
    next()
  }
} )


router.use( '/news', NewsRouter )
// router.use( '/location', authHandler.loginRequired, LocationRouter )
router.use( '/brand', BrandRouter )
router.use( '/subscriber', SubscriberRouter )
router.use( '/product', ProductRouter )
router.use( '/country', CountryRouter )
router.use( '/category', CategoryRouter )
router.use( '/user', authHandler.loginRequired, UserRouter )
router.use( '/upload', UploadRouter )
router.use( '/oauth', Auth )

module.exports = router

