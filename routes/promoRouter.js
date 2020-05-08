const express=require('express');
const bodyParser=require('body-parser');

const promoRouter=express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
 .get((req,res,next)=>{
     res.end('will send all the promotions back to you');
 })
 .post((req,res,next)=>{
     res.end('Will add the promotion '+req.body.name+' with details '+req.body.description);
 })
 .put((req,res,next)=>{
     res.statusCode=403;
     res.end('PUT operation not seperated in /promotions');
 })
 .delete((req,res,next)=>{
     res.end('Deleting all the promotions');
 });
 
promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end('will send the promotion: '+req.params.promoId+' to you');
 })
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not seperated in /promotions/'+req.params.promoId);
})
.put((req,res,next)=>{
    res.write('Updataing the promotion'+req.params.promoId+'\n');
    res.end('Will updte the promotion: '+req.body.name+' with details'+req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting the promotion'+ req.params.promoId);
});


 module.exports=promoRouter;







