const BrandModel = require( '../models/brand.model' )


async function create ( req, res )
{
  try
  {
    const { name, description, categoryId, countryId } = req.body
    const brand = new BrandModel( { name, description, categoryId, countryId } )
    await brand.save()
    return res.status( 200 ).json( {
      message: 'Ok'
    } )
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: error.message
    } )
  }
}

async function findAll ( req, res )
{
  const keyword = req.query
  let query = {}
  if ( keyword ) query = keyword
  try
  {
    const data = await BrandModel.find( query ).populate('categoryId').populate('countryId')
    return res.status( 200 ).json( data )
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: error.message
    } )
  }
}
async function findOne ( req, res )
{
  const id = req.params.id
  try
  {
    const data = await BrandModel.findById( id )
    if ( data )
    {
      return res.status( 200 ).json( data )
    }

    return res.status( 404 ).json( {
      message: 'Not Found',
    } )
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: error.message
    } )
  }
}

async function update ( req, res )
{
  const { name, description, categoryId, countryId } = req.body
  const brand = new BrandModel( { name, description, categoryId, countryId }, { _id : false } )
  const { id } = req.params
  try
  {
    await BrandModel.findByIdAndUpdate( id, brand )
    return res.status( 200 ).json( {
      message: 'Ok'
    } )
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: error.message
    } )
  }
}

async function deleteOne ( req, res )
{
  const id = req.params.id
  try
  {
    await BrandModel.findByIdAndDelete( id )
    return res.status( 200 ).json( {
      message: 'Ok',
    } )
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: error.message
    } )
  }
}

module.exports = { create, findAll, findOne, update, deleteOne }

