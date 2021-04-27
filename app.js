const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const app = express();
const PORT = 8000;
var url;
var title, release, rating
const details = {title:"",release_date:"",rating:""}
app.get('/scrap',(req,res)=>{
    // url = "https://www.imdb.com/title/tt0107290/"
    url = "https://www.imdb.com/title/tt0079221/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=690bec67-3bd7-45a1-9ab4-4f274a72e602&pf_rd_r=PWHY2KD5PBR2X8TG336G&pf_rd_s=center-4&pf_rd_t=60601&pf_rd_i=india.top-rated-indian-movies&ref_=fea_india_ss_toprated_tt_2"
    request(url,function (error,response,html){
        const $ = cheerio.load(html)
        $(".title_wrapper").filter(function(){
            var data = $(this)
            title = data.children().first().text().trim();
            nam = title.slice(0,-6);
            details.title = nam;
        })
        // to get the release year of the movie
        $("#titleYear").filter(function(){
            var data = $(this)
            release = data.children().first().text();
            details.release_date = release;
        })
        // to grab the rating of the movie
        $(".ratingValue strong").filter(function(){
            data = $(this)
            rating = data.children().first().text();
            details.rating = rating;
        })

        console.log("Here are the details ! ",details)
        res.send({Movie_details:details})
    })
})

app.get('/',(req,res)=>{
    res.send("you are welcome on home page")
})
app.listen(PORT,()=>{
    console.log(`server is runnning at port ${PORT}`)
}) 