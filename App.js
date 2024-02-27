const express = require('express')
const { mongoose} = require('mongoose');
const bodyParser = require('body-parser');
const Produt = require('./model/Product')

const app = express()
const _PORT = "3001"

// conection to dbs 
mongoose.connect('mongodb://127.0.0.1:27017/eco_web_node_mdb')

app.set("view engine","ejs")
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extend:true}))

app.get("/",(req,res)=>{
    Produt.find({}).then((products)=>{
        return res.render('index',{
            products
        });
    }).catch((err) => {
        console.error(err);
        return res.render('error');
    });
})
app.get("/create",(req,res)=>{
    return res.render('create');
})

app.post("/store",(req,res)=>{
    const {image,title,price,discount_price,quantity} = req.body;
    const produt = new Produt({image,title,price,discount_price,quantity});
    Produt.create(produt).then((res) => {
        console.log('Inserted successfuly !!');
        return res.redirect('/');
    }).catch((err) => {
        console.error(err);
        return res.render('create');
    })
})

app.get("/:id/show/",(req,res)=>{
    const {id} = req.params;
    Produt.findById(id).then((product)=>{
        if (!product) {
            return res.redirect('/error');
        };
        return res.render('show',{
            product
        });
    }).catch((err) => {
        console.error(err);
        return res.redirect('/error');
    });
})

app.get("/:id/edit/",(req,res)=>{
    const {id} = req.params;
    Produt.findById(id).then((product)=>{
        if (!product) {
            return res.redirect('/error');
        };
        return res.render('edit',{
            product
        });
    }).catch((err) => {
        console.error(err);
        return res.redirect('/error');
    });
})


app.post("/:id/update",(req,res)=>{
    const {id} = req.params;
    const {image,title,price,discount_price,quantity} = req.body;
    Produt.findByIdAndUpdate(
        id,
        {image,title,price,discount_price,quantity},
        { new: true },
    ).then((res) => {
        console.log('Updated successfuly !!');
        return res.redirect('/');
    }).catch((err) => {
        console.error(err);
        return res.redirect('/error');
    });
})

app.get("/:id/delete",(req,res)=>{
    const {id} = req.params;
    Produt.findByIdAndDelete(id)
    .then((res) => {
        console.log('Deleted successfuly !!');
        return res.redirect('/');
    }).catch((err) => {
        console.error(err);
        return res.redirect('/error');
    })
})

app.get("/error",(req,res)=>{
    return res.render('res/error');
})

app.listen(_PORT,()=>console.log(`The server starting in : http://localhost:${_PORT}`))