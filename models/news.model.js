const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const newsSchema = new Schema( {
  name: String,
  description: String,
  imageUrl: String,
}, {
  timestamps: true
} )
newsSchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.idNews = ret._id
    delete ret.id
    delete ret._id
    delete ret.__v
  }
} )
module.exports = mongoose.model( 'News', newsSchema )