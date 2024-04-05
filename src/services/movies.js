import axios from "axios";

class MovieDataService{

    getAll(page=0){
        return axios.get(`https://jb7iw7mjxgoabj2pm6v6qquoea0zkwli.lambda-url.us-east-1.on.aws/api/v1/movies?page=${page}`)
    }
    get(id){
        return axios.get(`https://jb7iw7mjxgoabj2pm6v6qquoea0zkwli.lambda-url.us-east-1.on.aws/api/v1/movies/id/${id}`)
    }
    find(searchTitle,rating,page=0){
        return axios.get(`https://jb7iw7mjxgoabj2pm6v6qquoea0zkwli.lambda-url.us-east-1.on.aws/api/v1/movies?title=${searchTitle}&rated=${rating}&page=${page}`)
    }
    createReview(data){
        return axios.post("https://jb7iw7mjxgoabj2pm6v6qquoea0zkwli.lambda-url.us-east-1.on.aws/api/v1/movies/review",data)
    }
    updateReview(data){
        return axios.put("https://jb7iw7mjxgoabj2pm6v6qquoea0zkwli.lambda-url.us-east-1.on.aws/api/v1/movies/review",data)
    }
    deleteReview(id,userId){
        return axios.delete(
            "https://jb7iw7mjxgoabj2pm6v6qquoea0zkwli.lambda-url.us-east-1.on.aws/api/v1/movies/review",
            {data:{review_id:id,user_id:userId}}
        )
    }
    getRatings(){
        return axios.get("https://jb7iw7mjxgoabj2pm6v6qquoea0zkwli.lambda-url.us-east-1.on.aws/api/v1/movies/ratings")
    }
}

export default new MovieDataService()