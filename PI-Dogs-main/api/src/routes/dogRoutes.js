require('dotenv').config();
const {Router, application} = require('express');
const router = Router();
const axios= require('axios');
const { Dog,Temperament } = require( '../db');
//const server= require('../app')
const {Op} = require('sequelize');
const {API_KEY}= process.env;
//const {getApi, getDbInfo, getAllInfo} = require('../controllers/infoController');
//const {reqApi} = require('../controllers/infoController');



/*------------INFO API------------------------------*/
const reqApi= async function getApi(){
          
         const reqApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
           // console.log(reqApi)
         const componenteInfo= reqApi.data.map((e) => {// requiere datos de la API thedogapi.com
            return {
                    id: e.id,
                    name: e.name,
                    height: e.height.metric.split(' - '),
                    weight: e.weight.metric.split(' - '),
                    life_span: e.life_span,
                    image: e.image.url,
                    temperament:e.temperament,
                }
               
            });
            return componenteInfo;
    }

    const reqDb= async () =>{
        return await Dog.findAll({
            include:{
                model: Temperament,
                attributes:{
                    include:['name']
                },
                through:{
                    attributes:[]
                }
            }
        });
    }
  
    const reqAllDogs= async()=>{
        const apiReq= await reqApi();
        const dbReq= await reqDb();
        const allReq= await apiReq.concat(dbReq);
        return allReq;
    }
        

    router.get('/dogs', async(req,res,next)=>{
        try{
            const {name}= req.query;
            if(!name){
               const api= await reqApi();
               const db= await reqDb();
               const allInfo= api.concat(db);
               res.status(200).send(allInfo.length ? allInfo : 'Info not found')
            }
            if(name){
                const api= await reqApi();
                const nameQuery=await  api.filter(data => data.name.toLowerCase().includes(name.toLowerCase()))
                const db= await Dog.findAll({
                    include: Temperament,
                    where:{
                        name:{
                            [Op.iLike]: '%' + name + '%'
                        }
                    }
                })
               // res.send('name')
               const allInfo= nameQuery.concat(db);
               res.status(200).send(allInfo.length ? allInfo : 'Info Dog not found');
            }
        }
        catch(err){
            next(err);
        }
    })

    // router.get('/dog/:id', async(req,res,next)=>{
    //     const {id}=req.params;
        
    //     try{
    //         const aDogs= await reqAllDogs();

    //         if(id){
    //             let breedId= await aDogs.filter(el => el.id === id);
    //             breedId.length ? res.status(200).json(breedId) : res.json({data: {error: 'No se encontro'}})
    //         }
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // })

    router.get('/dogs/:id', async(req,res,next)=>{
        const {id}= req.params;
        let DBDogs;
        try{
            if(isNaN(id)){
                const getDb= await Dog.findByPk(id,{
                    include:
                    {
                        model:Temperament,
                        attributes: ['name'],
                        through:{
                            attributes: [],
                        },
            
                    }
                })
            }
            
            // if(isNaN(id)) DBDogs= await reqDb(id);
            // if(DBDogs && DBDogs.length > 8){
            //     res.status(200).send(DBDogs[0]);
            // }
            else{
                let api= await reqApi(undefined);
                // console.log(api)
                const found= api.find(e => e.id === Number(id));
                found? res.send(found) : res.status(405).json({msg:'no existe'})
              }
           
        }
        catch(err){
            next(err);
        }
    })
           
    

    router.post("/dog", async (req, res) => {
        const { name, height, weight, life_span,image, createdInDb, temperament } = req.body;
        try{
         
          if (!name || !height || !weight)
            return res.status(404).send("The name, height and weight are required");
          const dogCreated = await Dog.create({
            name,
            image,
            weight,
            height,
            life_span,
            createdInDb
          });
          let temperamentDb = await Temperament.findAll({
                 where: { name : temperament }
        });
        dogCreated.addTemperament(temperamentDb)  
        //  console.log(temperamentDb); 
          return res.status(200).json("The dog has been successfully created");
        }
      
        catch(err){
         
          res.status(404).json(err)
        }
    })

     
        module.exports = router;

        