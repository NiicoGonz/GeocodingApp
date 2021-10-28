import {json, Request , response, Response} from 'express'
import { QueryResult } from 'pg';
import { pool } from '../database';
import fetch from 'cross-fetch';

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    try{
        const response:QueryResult = await  pool.query('SELECT * FROM users ORDER BY id');
        return  res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json('internal Server error');
    }
  
};

export const getUserbyId = async(req: Request,res: Response): Promise<Response>=>{
 try{
     const id = parseInt(req.params.id);
    const response:QueryResult = await pool.query('SELECT * FROM users WHERE id=$1',[id]);
    if(response.rows.length>0){
        return res.status(200).json(response.rows);
    }
    else{
        return res.status(404).json('Usuario no encontrado');
    }
 }   
 catch(e){
     console.log(e);
     return res.status(500).json('Problemas con el servidor');
 }

 
};

export const createUser = async(req: Request,res: Response): Promise<Response>=>{
    try{
    const {name,lastname ,addres,city } = req.body;
       const response:QueryResult = await pool.query('INSERT INTO users (name,lastname ,addres,city)  VALUES ($1,$2,$3,$4)', [name,lastname ,addres,city]);
       return res.status(200).json({
           message: "User add succesfully",
           body: {
               user: {name,lastname ,addres,city}
           }

       })
    }  
    catch(e){
        console.log(e);
        return res.status(404).json('No se puede crear al usuario');
    }
   
    
   };

   export const updateUser = async(req: Request,res: Response): Promise<Response>=>{
    try{
       const id = parseInt(req.params.id);
       const {name,lastname ,addres,city} =req.body;
       const response:QueryResult = await pool.query('UPDATE users SET name = $1, lastname= $2, addres = $3, city = $4 WHERE id = $5',
    [
        name,
        lastname,
        addres,
        city,
        id
    ]);
       return res.status(200).json("Usuario actualizado con exito");
    }   
    catch(e){
        console.log(e);
        return res.status(404).json('No se pudo actualizar el usuario');
    }
   
    
   }

   export const deleteUser = async(req: Request,res: Response): Promise<Response>=>{
    try{
       const id = parseInt(req.params.id); 
       const response:QueryResult = await pool.query('DELETE FROM users WHERE id = $1', [id]);
       return res.status(200).json(`User ${id} deleted succesfully`);
    }   
    catch(e){
        console.log(e);
        return res.status(404).json(`Problema al eliminar`);
    }
   
    
   }

   export const getGeolocation = async(req:Request, res: Response): Promise<Response> =>{
       try{
            let getId;
            let latitud;
            let longitud;
            let geostatus;
         const users= pool.query('SELECT * FROM users');
         const usuarios = (await users).rows;
         usuarios.forEach(await (element => {
             
             const prueba = fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${element.addres},${element.city}.json?limit=1&access_token=pk.eyJ1IjoiZGV2bmlpY28iLCJhIjoiY2t2YTl6aXduYWN2bjJ3bWFqZ29naHZuZSJ9.dw38xoTpOrby6jlQpqLqnA`)
             .then(res => res.json())
             .then(json =>
            {       getId=element.id;

                if(json.features.length >0){
                    latitud= json.features[0].geometry.coordinates[0];
                    longitud= json.features[0].geometry.coordinates[1];
                    geostatus='A';
                   console.log(latitud,longitud,geostatus);
                   pool.query('UPDATE users SET  latitude = $1, long = $2 , geostatus =$3  WHERE id=$4',[latitud,longitud,geostatus,getId]);  
                }
                else{
                    geostatus='F';
                    pool.query('UPDATE users SET  latitude = 0, long = 0  , geostatus =$1 WHERE id=$2',[geostatus,getId]);
                }
                   

            })
                
         }));
         
         return res.status(200).json('Actualizacion de coordenadas realizados porfavor verificar en localhost:4000/users');
           
       }
       catch(e){
        console.log(e);
        return res.status(404).json('no se pudo consultar');
       }
   }

    
    
