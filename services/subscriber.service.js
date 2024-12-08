const SubscriberModel = require('../models/subscriber.model')


async function create(req, res) {
  const existingSubscriber = await SubscriberModel.findOne({ email: req.body.email })
  if (!existingSubscriber) {
    try {
      const { email, notes } = req.body
      const brand = new SubscriberModel({ email, notes })
      await brand.save()
      return res.status(200).json({
        message: 'Ok'
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  } else return res.status(409).json({ message: 'Email already exist' });

}

async function findAll(req, res) {
  const keyword = req.query
  let query = {}
  if (keyword) query = keyword
  try {
    const data = await SubscriberModel.find(query)
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
    const data = await SubscriberModel.findById(id)
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
  const { email, notes } = req.body
  const brand = new SubscriberModel({ email, notes }, { _id: false })
  const { id } = req.params
  try {
    await SubscriberModel.findByIdAndUpdate(id, brand)
    return res.status(200).json({
      message: 'Ok'
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
    await SubscriberModel.findByIdAndDelete(id)
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

