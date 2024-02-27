
const { mongoose} = require('mongoose');


const schema = new mongoose.Schema(    {
    // id: Number,
    // is_available: Boolean,
    // is_featured: Boolean,
    image: String,
    title: String,
    price: Number,
    discount_price: Number,
    quantity: Number,
});


module.exports = mongoose.model('Produt',schema);