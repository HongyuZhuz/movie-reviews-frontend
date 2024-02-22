import axios from "axios";

class MovieDataService{

    getAll(page=0){
        return axios.get(`https://peaceful-mesa-18237-772f6179939a.herokuapp.com/api/v1/movies?page=${page}`)
    }
    get(id){
        return axios.get(`https://peaceful-mesa-18237-772f6179939a.herokuapp.com/api/v1/movies/id/${id}`)
    }
    find(searchTitle,rating,page=0){
        return axios.get(`https://peaceful-mesa-18237-772f6179939a.herokuapp.com/api/v1/movies?title=${searchTitle}&rated=${rating}&page=${page}`)
    }
    createReview(data){
        return axios.post("https://peaceful-mesa-18237-772f6179939a.herokuapp.com/api/v1/movies/review",data)
    }
    updateReview(data){
        return axios.put("https://peaceful-mesa-18237-772f6179939a.herokuapp.com/api/v1/movies/review",data)
    }
    deleteReview(id,userId){
        return axios.delete(
            "https://peaceful-mesa-18237-772f6179939a.herokuapp.com/api/v1/movies/review",
            {data:{review_id:id,user_id:userId}}
        )
    }
    getRatings(){
        return axios.get("https://peaceful-mesa-18237-772f6179939a.herokuapp.com/api/v1/movies/ratings")
    }
}

export default new MovieDataService()