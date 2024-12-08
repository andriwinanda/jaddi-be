const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const subscriberSchema = new Schema( {
  email: String,
  notes: String,
}, {
  timestamps: true
} )

subscriberSchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.idSubsciber = ret._id
    delete ret.id
    delete ret._id
    delete ret.__v
  }
} )
module.exports = mongoose.model( 'Subsciber', subscriberSchema )