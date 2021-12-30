import {
    GET_DOGS,
    FILTER_BY_VALUE,
    SEARCH_BY_NAME,
    FILTER_CREATED,
    FILTER_TEMPERAMENT,
    GET_TEMPERAMENTS,
    GET_DETAIL,
    ADD_DOG,
    
  } from "../actions/types";

const initialState={
    dogs:[],
    fitered:[],
    temperaments:[],
    detail:[]
};

export default function rootReducer(state= initialState,action){ //action(tiene type y payload)
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                filtered:action.payload
            };

        case ADD_DOG:
            return{
                ...state,
            };
        
        case FILTER_TEMPERAMENT:
            const allDogs= state.dogs;
            const temperamentsFiltered= action.payload === 'all' ? allDogs : allDogs.filter((e)=>
            e.temperament === action.payload);
            return{
                ...state,
                dogs: temperamentsFiltered,
            };
        case GET_TEMPERAMENTS:
            return{
                ...state,
                dogs:action.payload
            };
            case SEARCH_BY_NAME:
                return {
                  ...state,
                  dogs: action.payload,
                };
         case FILTER_CREATED:
            let backUp= state.backUpDogs;
            let createdFilter= action.payload === 'CREATED'? backUp.filter((e)=> e.createdInDb) : backUp.filter((e)=> !e.createdInDb);
            return{
                ...state,
                dogs: action.payload === 'ALL'? state.backUpDogs : createdFilter,

            };
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload,
            };
        case FILTER_BY_VALUE:
            let info=state.dogs;
            let sortedArray= action.payload === 'AZ' ? info.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
            : action.payload === 'ZA'? info.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(a.name > b.name){
                    return 1;
                }
                return 0;
            })
            : action.payload === 'WEIGHT'? info.sort(function(a,b){
                if (
                    Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
                  ) {
                    return -1;
                  }
                  if (
                    Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
                  ) {
                    return 1;
                  }
                  return 0;
                })
              : info.sort(function (a, b) {
                  if (
                    Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
                  ) {
                    return 1;
                  }
                  if (
                    Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
                  ) {
                    return -1;
                  }
                  return 0;
                });
          return {
            ...state,
            dogs: sortedArray,
          };
      default:
           return state;
       }
     }
    //}
    
 //export default rootReducer;
            
