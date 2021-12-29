import React  from "react";

export default function Paginado({dogsXPage,allDogs,paginated}){
    const pageNumbers=[] //en principio comienza como un array vacio, al q se le pushearan los numeros de pagina


    //recorro el array y tomo el numero que resulta de allDogs/dogsXPage,y lo pusheo a pageNumber
    for(let i=0; i<= Math.ceil(allDogs/dogsXPage);i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className="paged">
                {pageNumbers && pageNumbers.map(num =>{
                    <li className="numberPage" key={num}>
                        <a href="/#" onClick={()=> paginated(num)}>{num}</a>
                    </li>
                    
                })}
            </ul>
        </nav>
    )
}