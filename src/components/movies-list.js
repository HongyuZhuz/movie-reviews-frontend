import React, { useState ,useEffect} from "react";
import MovieDataService from "../services/movies.js"
import { Link } from "react-router-dom";
import { Form,Button,Col,Row,Container,Card} from 'react-bootstrap'


const MoviesList = props=>{
    const [movies,setMovies]=useState([])
    const [searchTitle, setSearchTitle]=useState([])
    const [searchRating,setSearchRating]=useState("")
    const [ratings,setRatings]=useState(["All Ratings"])

    useEffect(()=>{
        retrieveMovies()
        retrieveRatings()
    },[])

    const retrieveMovies = ()=>{
        MovieDataService.getAll()
        .then(response=>{
            console.log(response.data)
            setMovies(response.data.movies)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const retrieveRatings = ()=>{
        MovieDataService.getRatings()
        .then(response=>{
            console.log(response.data)
            setRatings(["All Ratings"].concat(response.data))
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const onChangeSearchTitle=e=>{
        const searchTitle=e.target.value
        setSearchTitle(searchTitle);
    }
    const onChangeSearchRating =e=>{
        const searchRating=e.target.value
        setSearchRating(searchRating);
    }

    const find=(searchTitle,rating)=>{
        MovieDataService.find(searchTitle,rating)
        .then(response=>{
           console.log(response.data)
            setMovies(response.data.movies)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const findBy =()=>{
        find(searchTitle,searchRating)
    }

    return(
        <div className="App">
            <Container>
                <SearchForm onSearch={findBy} searchTitle={searchTitle} searchRating={searchRating} onChangeSearchTitle={onChangeSearchTitle} onChangeSearchRating={onChangeSearchRating} ratings={ratings}/>
                <MovieGrid movies={movies}/>
            </Container>
        </div>
    );
}

const SearchForm =({onSearch,searchRating,searchTitle,onChangeSearchRating,onChangeSearchTitle,ratings})=>{
    return(
        <Form>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Control as="select" value={searchRating} onChange={onChangeSearchRating}>
                            {ratings.map(rating=>(
                                <option  value={rating}>{rating}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="button" onClick={onSearch}>
                        Search
            </Button>
        </Form>
    )
}

const MovieCard=({movie})=>{
    return(
        <Card style={{width:'18rem'}}>
            <Card.Img variant = "top" src={movie.poster+"/100px180"}/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        Rating:{movie.rated}
                    </Card.Text>
                <Card.Text>{movie.plot}</Card.Text>
                <Link to={`/movies/${movie._id}`}>View Reviews</Link>
            </Card.Body>
        </Card>
    )
}

const MovieGrid=({movies})=>{
    return(
        <Row>
            {movies.map((movie,index)=>(
                <Col key={index}>
                    <MovieCard movie={movie}/>
                </Col>
            ))}
        </Row>
    )
}

export default MoviesList;