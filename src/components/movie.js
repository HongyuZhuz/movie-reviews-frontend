import React, { useEffect, useState } from "react";
import MovieDataService from '../services/movies'
import { Link, useParams} from "react-router-dom";




const Movie=props=>{
    const {id} = useParams();
    const [movie,setMovie] = useState({id:null,title:"", rated:"",reviews:[]})
    const getMovie =id =>{
        MovieDataService.get(id)
        .then(response=>{
            setMovie(response.data)
            console.log(response.data)
        })
        .catch(e=>{
            console.log(e)
        })
    }
    useEffect(()=>{
        getMovie(id)
    },[id])
    return(
        <div className="App">
            Movie
        </div>
    )
}
export default Movie;