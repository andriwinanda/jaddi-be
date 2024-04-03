const CountryModel = require('../models/country.model')


async function create(req, res) {
  const existingCountry = await CountryModel.findOne({ name: req.body.name })
  if (!existingCountry) {
    try {
      const { name, description, categoryId } = req.body
      const country = new CountryModel({ name, description, categoryId })
      const data = await country.save()
      return res.status(200).json({
        message: 'Ok',
        data
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  } else return res.status(409).json({ message: 'Country already exist' });

}

async function findAll(req, res) {
  const keyword = req.query
  let query = {}
  if (keyword) query = keyword
  try {
    const data = await CountryModel.find(query).populate('categoryId')
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
    const data = await CountryModel.findById(id)

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
  const { name, description, categoryId } = req.body
  let country = new CountryModel({ name, description, categoryId }, { _id: false })
  const { id } = req.params
  try {
    const data = await CountryModel.findByIdAndUpdate(id, country)
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
    await CountryModel.findByIdAndDelete(id)
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

