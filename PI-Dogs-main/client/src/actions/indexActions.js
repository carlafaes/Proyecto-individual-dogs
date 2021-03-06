import axios from 'axios';
import {
    GET_DOGS,
    GET_DETAIL,
    GET_TEMPERAMENTS,
    SEARCH_BY_NAME,
    FILTER_TEMPERAMENT,
    FILTER_BREED,
    ADD_DOG,
    ORDER_BY,
    ORDER_BY_WEIGHT,
  } from "./types";

export function getDogs(){
    return async function(dispatch){
        try{
            let json= await axios.get('http://localhost:3001/dogs',{

            });
            // json.data.temperaments =  json.data.temperaments.map((t) => t.name)
            // const response= json.data.temperaments.map((t) => t.name)
            return dispatch({
                type: GET_DOGS,
                payload: json.data
            });
        }
        catch(err){
            console.log(err);
        }
       
    };
};

export function getDetails(id){
    return async (dispatch)=>{
        const json=await axios.get(`http://localhost:3001/dogs/${id}`);
        
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        });
    };
};
export const addDogType = () => ({type: 'ADD_DOG'}) 

export function getTemperament(){
    return async(dispatch)=>{
        let json=await axios.get('http://localhost:3001/temperament');
        return dispatch({
            type:GET_TEMPERAMENTS,
            payload: json.data
        });
    };
};

export const searchByName= (name)=>{
    return async(dispatch)=>{
        try{
            const getName= await axios.get(`http://localhost:3001/dogs?name=${name}`)
            console.log(getName.data, 'error getname')
                return dispatch({
                    type: SEARCH_BY_NAME,
                    payload: getName.data,
                })
           }
        catch(err){
          console.log(err);
        }
   }
      }
    
       

export function filterBreed(value){
    return{
        type: FILTER_BREED,
        payload:value
    };
}

export function filterByTemperament(payload){
    console.log(payload)
    return{
     type:FILTER_TEMPERAMENT,
     payload
    }
  
}


export function orderBy(value){
    return {
        type: ORDER_BY,
        payload: value,
    }
}

export function orderByWeight(value){
    return{
        type:ORDER_BY_WEIGHT,
        payload:value,
    }
}

export function addDog(payload){
    return async function(dispatch){
        const created= await axios.post('http://localhost:3001/dog',payload);
        // console.log(created)
        return created;
    }
}