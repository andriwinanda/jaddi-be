
const express = require( 'express' )
const multer = require( 'multer' )
var bodyParser = require( 'body-parser' )
// const cors = require('cors');
const dotenv = require('dotenv');
const path = require( 'path' )
const DataUri = require( 'datauri' )
cloudinary = require( 'cloudinary' ).v2

dotenv.config()
const dataUri = new DataUri()

cloudinary.config( {
  cloud_name: 'dedwkqlng',
  api_key: '758295783351224',
  api_secret: 'Pq7wR1HZ8ieKqex3YrMQdi2rK6Q'
} )
const upload = multer()
const routes = express.Router()
routes.use(
  bodyParser.urlencoded( {
    extended: false,
  } )
)
// routes.post( '/', create )
// routes.get( '/', findAll )
// routes.get( '/:id', findOne )
// routes.put( '/:id', update )
// routes.delete( '/:id', deleteOne )

// routes.use(express.json());
// routes.use((request, response, next) => {
//   response.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// const whitelist = [ 'http://localhost:5000' ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

routes.post( '/', upload.single( 'file' ), ( request, response ) =>
{
  let image = request.files.file
  const folder = request.query.folder
  const fileName = request.files.file.name
  if ( image )
  {
    image = dataUri.format( path.extname( fileName ).toString(), image.data ).content
    cloudinary.uploader.upload( image,
      {
        public_id: fileName.replace(/\.[^/.]+$/, ""),
        folder: folder
      },
      ( error, result ) =>
      {
        if ( error )
        {
          return response.status( 400 )
            .json( {
              error: 'Failed to upload to the cloud',
              message: error.message.includes('public_id') ? error.message.replace('public_id', 'file name') : error.message,
            } )
        }
        return response.status( 200 )
          .json( {
            data: result.secure_url,
          } )
      } )
  } else
  {
    return response.status( 400 )
      .json( {
        error: 'Please add the image to be uploaded',
      } )
  }
} )


module.exports = routes