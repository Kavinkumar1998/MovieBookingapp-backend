import express from "express";
import {Movies} from "../Model/Movies.js";

const router = express.Router();

//router for adding movies
router.post("/addmovie", async(req,res)=>{
    try{
        const{title,fullTitle,year,releaseDate,image,runtimeMins,runtimeStr,plot,contentRating,imDbRating,imDbRatingCount,
            metacriticRating,genres,genreList,directors,directorList,stars,trailer,boxOffice,posters,backdrops  }= req.body;
            let newMovie = await new Movies({
                title:title,
                fullTitle:fullTitle,
                year:year,
                releaseDate:releaseDate,
                image:image,
                runtimeMins:runtimeMins,
                runtimeStr:runtimeStr,
                plot:plot,
                contentRating:contentRating,
                imDbRating:imDbRating,
                imDbRatingCount:imDbRatingCount,
                metacriticRating:metacriticRating,
                genres:genres,
                genreList:genreList,
                directors:directors,
                directorList:directorList,
                stars:stars,
                trailer:trailer,
                boxOffice:boxOffice,
                posters:posters,
                backdrops:backdrops,
                
            }).save();
            res.status(200).json({message:"Data upadted sucessfully"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})


//router for adding many data
router.post("/addAlldata", async(req,res)=>{
try{
    const[{title,fullTitle,year,releaseDate,image,runtimeMins,runtimeStr,plot,contentRating,imDbRating,imDbRatingCount,
        metacriticRating,genres,genreList,directors,directorList,stars,trailer,boxOffice,posters,backdrops  }]= req.body;
        let newMovie = await  Movies.insertMany(req.body);
        res.status(200).json({message:"Data upadted sucessfully"})
}catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server Error"})
}
})

//router for getting data
router.get("/getMovie",async(req,res)=>{
    try{
        let allmovie = await Movies.find();
        if(!allmovie){
            res.status(400).json({message: "Internal Server Error"});
        }else{
        res.status(200).json(allmovie);
        } 
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})


export const movieRouter = router;