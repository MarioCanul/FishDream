const {Router} = require('express');
const router =Router();
const Fish = require('../models/Fishes');
const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name:process.env.ClOUD_NAME,
api_key:process.env.API_KEY,
api_secret:process.env.API_SECRET
});
const fs = require('fs-extra');
// routes
router.get('/',async (req, res)=>{
   const Fishes = await Fish.find().lean();
   res.render('images',{Fishes}); 
});
router.get('/images/Fish',async (req,res)=>{
   const Fishes = await Fish.find().lean();
   res.render('image_form',{Fishes})
})
router.post('/images/add',async (req,res)=>{
   const {Nombre,Precio,Descripcion}=req.body;
   const result = await cloudinary.v2.uploader.upload(req.file.path,{folder:'DreamFish',quality_analysis:'true'  }, (result)=>{ console.log('Foto subida :') });
   const newFish = new Fish({
               Nombre,
               Precio,
               Descripcion,
               imageURL:result.url,
               public_id:result.public_id
            });
            await newFish.save();
            await fs.unlink(req.file.path);
            res.redirect('/')
})
router.get('/images/Delete/:fish_id', async(req,res)=>{
   const {fish_id}=req.params;
  const fishDelet = await Fish.findByIdAndDelete(fish_id);
  await cloudinary.v2.uploader.destroy(fishDelet.public_id)
  res.redirect('/images/Fish')
});
router.post('/Buscar',async(req,res)=>{
   const Nombre = req.body.Nombre
   console.log(Nombre);
    let Fishes = await Fish.find({'Nombre':`${Nombre}`}).collation({locale:"es",strength:1,alternate:"shifted"}).lean();
   let code2 = await Fish.find({'Nombre': new RegExp(`${Nombre}`, 'gi')}).lean();
   Fishes=Fishes.concat(code2);
   Fishes=Fishes.filter(function(value,index,self){
      return self.indexOf(value) === index;   
  });
  res.render('images',{Fishes});
})
module.exports = router;