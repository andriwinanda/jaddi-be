const ProductModel = require('../models/product.model')


async function create(req, res) {
  const existingProduct = await ProductModel.findOne({ name: req.body.name })
  if (!existingProduct) {
    try {
      const { name, description, imageUrl, countryId, categoryId, brandId } = req.body
      const product = new ProductModel({ name, description, imageUrl, countryId, categoryId, brandId })
      const data = await product.save()
      return res.status(200).json({
        message: 'Ok',
        data
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  } else return res.status(409).json({ message: 'Product already exist' });
}

async function findAll(req, res) {
  const keyword = req.query
  let query = {}
  if (keyword) query = keyword
  try {
    console.log(query)
    // const data = await ProductModel.find(query).populate('categoryId').populate('countryId').populate('brandId')
    const data = await ProductModel.find(query)
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
async function findOne(req, res) {
  const id = req.params.id
  try {
    const data = await ProductModel.findById(id)
    if (data) {
      return res.status(200).json(data)
    }

    return res.status(404).json({
      message: 'Not Found',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function update(req, res) {
  const { name, description, imageUrl, countryId, categoryId, brandId } = req.body
  const product = new ProductModel({ name, description, imageUrl, countryId, categoryId, brandId }, { _id: false })
  const { id } = req.params
  try {
    const data = await ProductModel.findByIdAndUpdate(id, product)
    return res.status(200).json({
      message: 'Ok',
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function deleteOne(req, res) {
  const id = req.params.id
  try {
    await ProductModel.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Ok',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { create, findAll, findOne, update, deleteOne }

