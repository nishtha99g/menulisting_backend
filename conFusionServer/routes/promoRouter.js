const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const authenticate = require('../authenticate');
const Promotions=require('../models/promotions');
const cors = require('./cors');

const promoRouter=express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
 .options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
 .get(cors.cors,(req,res,next)=>{
     Promotions.find({})
     .then((promotions)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(promotions);  
     },(err)=>next(err))
     .catch((err)=>next(err));
 })
 .post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
     Promotions.create(req.body)
     .then((promotion)=>{
         console.log('Promotion created',promotion.toObject);
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(promotion);
        },(err)=>next(err))
        .catch((err)=>next(err));
 })
 .put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
     res.statusCode=403;
     res.end('PUT operation not seperated in /promotions');
 })
 .delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
     Promotions.remove({})
     .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
     },err=>next(err))
     .catch((err)=>next(err));
 });
 
 promoRouter.route('/:promoId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
 })
.post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not seperated in /promotions/'+req.params.promoId);
})
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


 module.exports=promoRouter;







