import React, { useEffect, useState } from "react";
import MovieDataService from '../services/movies'
import { Link, useParams} from "react-router-dom";
import {Card,Container,Image,Col,Row,Button} from 'react-bootstrap'
import moment from 'moment'




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

    const deleteReview = (reviewId,index)=>{
        MovieDataService.deleteReview(reviewId,props.user.id)
        .then(response=>{
            setMovie((prevState)=>{
                const updatedReviews = prevState.reviews.filter((_,i)=>i!==index);
                return{
                    ...prevState,reviews:updatedReviews
                }
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }

    return(
        <div className="App">
            <MovieCard movie={movie} id={id} user={props.user} deleteReview={deleteReview}/>
        </div>
    )
}
const MovieCard =({movie,id,user, deleteReview})=>{

    return(
        <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster+"/100px250"} fluid/>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {user&&<Link to={"/movies/"+id+"/review"}>Add Review</Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br></br>
                        <MovieReviews movie={movie} user={user} id={id} deleteReview={deleteReview}/>
                    </Col>
                </Row>
            </Container>
    )
}
const MovieReviews = ({movie,user,id,deleteReview})=>{
    
    return(
        movie.reviews.map((review,index)=>{
            return(
            <div className="media" key={index}>
                <div className="media-body">
                    <h5>{review.name+" reviewed on "}{moment(review.date).format("Do MMMM YYYY")}</h5>
                    <p>{review.review}</p>
                    {user&&user.id===review.user_id&&
                    <Row>
                        <Col>
                            <Link to={`/movies/${id}/review`} state={{currentReview:review}}>
                                Edit
                            </Link>
                        </Col>
                        <Col><Button variant="link" onClick={()=>deleteReview(review._id,index)}>Delete</Button></Col>
                    </Row>}
                </div>
            </div>)
        })
    )
}
export default Movie;