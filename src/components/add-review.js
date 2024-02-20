import React,{useState} from "react";
import MovieDataService from "../services/movies";
import { Link,useParams } from "react-router-dom";
import {Form,Button} from 'react-bootstrap';

const AddReview=props=>{
    let editing=false
    let initialReviewState=""

    const [review,setReview]=useState(initialReviewState)
    const [submitted,setSubmitted]=useState(false)
    const {id} = useParams();

    const onChangeReview =e=>{
        const review=e.target.value
        setReview(review);
    }

    const saveReview =()=>{
        var data = {
            review:review,
            name:props.user.name,
            user_id:props.user.id,
            movie_id:id
        }
        MovieDataService.createReview(data)
        .then(response=>{
            setSubmitted(true)
        })
        .catch(e=>{console.log(e)})
    }

    return(
        <div>
            {
                submitted?(
                    <div>
                        <h4>Review submitted successfully</h4>
                        <Link to={"/movies/"+id}>Back to Movie</Link>
                    </div>
                ):(
                    <Form>
                        <Form.Group>
                            <Form.Label>{editing?"Edit":"Create"}</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={review}
                                onChange={onChangeReview}/>
                        </Form.Group>
                        <Button variant="primary" onClick={saveReview}>Submit</Button>
                    </Form>
                )
            }
        </div>
    )
}
export default AddReview;