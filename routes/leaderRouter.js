const express=require('express');
const bodyParser=require('body-parser');

const lRouter=express.Router();

lRouter.use(bodyParser.json());

lRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
 .get((req,res,next)=>{
     res.end('will send all the leaders back to you');
 })
 .post((req,res,next)=>{
     res.end('Will add the leasder'+req.body.name+'with details'+req.body.description);
 })
 .put((req,res,next)=>{
     res.statusCode=403;
     res.end('PUT operation not seperated in /leaders');
 })
 .delete((req,res,next)=>{
     res.end('Deleting all the leaders');
 });
 
 lRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('will send the leader: '+req.params.leaderId+' to you');
 })
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not seperated in /leaders/'+req.params.leaderId);
})
.put((req,res,next)=>{
    res.write('Updataing the leader'+req.params.leaderId+'\n');
    res.end('Will updte the leader: '+req.body.name+' with details'+req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting the leader'+ req.params.leaderId);
});


 module.exports=lRouter;









