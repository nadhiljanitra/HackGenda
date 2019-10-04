const Route = require('express').Router();
const axios = require('axios');
Route.get('/',function(req,res){
    axios({
        method : 'get',
        url : 'http://developers.zomato.com/api/v2.1/search?entity_type=city&q=indonesia&count=20',
        headers : {
            user_key : '4ec0603a09c9df19378debe963f24414'
        }
    })
        .then(function({data}){
            // if(data){
                let restaurants = [];
                for(let i=0;i<data.restaurants.length;i++){
                    restaurants.push({
                        id : data.restaurants[i].restaurant.id,
                        name : data.restaurants[i].restaurant.name,
                        avgcft : data.restaurants[i].restaurant.average_cost_for_two,
                        location : data.restaurants[i].restaurant.location,
                        url : data.restaurants[i].restaurant.url,
                        highlights : data.restaurants[i].restaurant.highlights,
                        image : data.restaurants[i].restaurant.photos,
                        phoneNumber : data.restaurants[i].restaurant.phone_numbers,
                        reviews : data.restaurants[i].restaurant.all_reviews
                    })
                }
                res.status(200).json(restaurants);
            // }else{
            //     res.status(404).json({msg:"data tidak ditemukan"})
            // }
        })
        .catch(console.log)
})
Route.get('/s',function(req,res){
    axios({
        method : 'get',
        url : `https://developers.zomato.com/api/v2.1/restaurant?res_id=${req.query.id}`,
        headers : {
            user_key : '4ec0603a09c9df19378debe963f24414'
        }
    })
        .then(function({data}){
            let reviews = data.all_reviews.reviews;
            let avgcft = data.average_cost_for_two;
            let highlights = data.highlights;
            let {location} = data;
            let {name} = data;
            let image = data.photos;
            res.status(200).json({reviews,avgcft,highlights,location,name,image})
        })
        .catch(console.log)
})
Route.get('/sr',function(req,res){
    axios({
        method : 'get',
        url : `https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${req.query.name}`,
        headers : {
            user_key : '4ec0603a09c9df19378debe963f24414'
        }
    })
        .then(function({data}){
            console.log(data)
            res.status(200).json(data);
        })
        .catch(console.log)
})

module.exports = Route;