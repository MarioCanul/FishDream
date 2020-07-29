const {Schema, model } = require('mongoose');
const Fish = new Schema({
    Nombre:String,
    Precio:String,
    Descripcion:String,
    imageURL: String,
    public_id:String
});
module.exports = model('Fish',Fish);