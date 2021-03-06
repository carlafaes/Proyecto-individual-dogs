import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetails, addDogType} from "../actions/indexActions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import './DogDetails.css';
import perro2 from '../img/perro2.jpg'


export default function Detail(props){
    
    const dispatch= useDispatch();
    const {id}=useParams()

    useEffect(()=> { 
        dispatch(getDetails(id))
    },[dispatch,id])


    
const myDog= useSelector((state)=> state.detail); //me traigo el detalle desde el reducer 
// {console.log(myDog)}
return(
    <div>
        <div className="fondo2">
        <div className="contenedor_gral">
            {Object.values(myDog).length >0 ?
            <div className="contenedor_card">
                <h1 className="name">{myDog.name}</h1>
                <img className="img" alt="imgDog" src={myDog.image?myDog.image : perro2}/>
                <div className="info_text1">
                <h4 >Temperament: {!myDog.createdInDb ? myDog.temperament : myDog.temperaments.map(e => e.name + '.')}</h4> 
                </div>
                <div className="info_text2">
                <h4 >Life Span: {myDog.life_span}</h4>
                </div>
                <div className="info_text3" >
                <h4>Height[cm]: {myDog.height[0]}- {myDog.height[1]}</h4>
                </div>
                <div className="info_text4">
                <h4 >Weight [kg]: {myDog.weight[0]} - {myDog.weight[1]}</h4>
                </div>
            </div> 
            : 
            <div className="loading"> Loading</div>
        }
        <Link to= '/home'>
            
            <button className="back">
            <span id='span1'></span>
            <span id='span2'></span>
            <span id='span3'></span>
            <span id='span4'></span>   
            Go back
            </button>
        </Link>
        </div>
        </div>
    </div>
)
}
