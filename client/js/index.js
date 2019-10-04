// $(document).ready(function(){
    $('#main-content').empty()
    $('#second-content').empty()
    $('#restaurantId').hide()
    function showRestaurants () {
        $('#main-content').empty();
        $('#second-content').empty();
    $.ajax({
        method : 'get',
        url : 'http://localhost:3000/zomato'
    })
        .done(function(restaurants){
            for(let i=0;i<restaurants.length;i++){
                if(restaurants[i].image[0].photo.url){
                    $('#main-content').append(`
                    <div class='col'>
                    <div class="card" style="padding:1px;width: 18rem;">
                        <img src="${restaurants[i].image[0].photo.url}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title" onclick='myFunction("${restaurants[i].name}")'>${restaurants[i].name}</h5>
                        <p class="card-text">Reviews count ${restaurants[i].reviews.reviews.length}</p>
                        <p class='card-text'>${restaurants[i].location.address}</p>
                        <p class='card-text'>${restaurants[i].phoneNumber}<br></p>
                        <p class='card-text'>${restaurants[i].avgcft}<br></p>
                        <a  onclick='showImg(${restaurants[i].id})'><button type="button" class="btn btn-outline-secondary")>Show Image</button></a>
                        <a  onclick='showReviews(${restaurants[i].id})'><button type="button" class="btn btn-outline-secondary")>Reviews</button></a>
                        </div>
                        </div>
                    </div>
                    </div>
                    `)
                    $('#main-content').show()
                }else{
                    console.log('difoto error')
                }
            }
        })
        .fail(console.log)
    }
// })
function showImg(id){
    $('#main-content').empty()
    let getId = Number(id)
    $.ajax({
        method : 'get',
        url : `http://localhost:3000/zomato/s?id=${getId}`
    })
        .done(function(data){
            $('#second-content').show()
            for(let i=0;i<data.image.length;i++) {
                $('#second-content').append(`
                <div class="card" style="width: 18rem;">
                    <img src="${data.image[i].photo.url}" class="card-img-top" alt="...">
                    </div>
                `)
            }
        })
}
function showReviews(id){
    let getId = Number(id);
    $('#main-content').empty()
    $('#second-content').empty()
    $.ajax({
        method : 'get',
        url : `http://localhost:3000/zomato/s?id=${getId}`
    })
        .done(function(data){
            console.log(data)
            $('#second-content').show()
            let reviews=data.reviews;
            for( let i=0;i<reviews.length;i++ ){
                $('#second-content').append(`
                <div class="card pl-10" style="width: 18rem;">
                    <img src="${reviews[i].review.user.profile_image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${reviews[i].review.user.name}</h5>
                        <p class="card-text">${reviews[i].review.review_text}</p>
                    </div>
                    </div>
                `)
            }
        })
        .fail(console.log)
}
// reviews,avgcft,highlights,location,name,image

var temp = []


function myFunction(name){
    console.log(name)
    $('.dropdown-menu').empty()
    temp.push(name)
    for(let i=0;i<temp.length;i++){
        $('.dropdown-menu').append(`
            <a class="dropdown-item" onclick='removeItem()'>${temp[i]}</a>
        `)
    }
    $('.dropdown-menu').append(`
    <a class='dropdown-item'><button type="button" onclick="removeItem()">Reset All</button></a>
    <a class='dropdown-item'><button type='button' onclick="checkout()"> Check Out</button></a>
    `)
}

function removeItem() {
    $(`.dropdown-item`).empty();
    $('#restaurantId').hide();
}

function checkout(){
    $('#main-content').empty();

    for( let i=1;i<temp.length;i++ ){
        $('#main-content').append(`
            <div class="card w-50">
                <div class="card-body">
                <h5 class="card-title">Date : ${temp[0]} </h5>
            <p class="card-text">${temp[i]}</p>
                <a href="#" class="btn btn-primary">Button</a>
                </div>
            </div>
        `)
    }
    // console.log(temp)
    let date = temp[0]
    let restaurants = JSON.stringify(temp.slice(1))
    console.log(date, restaurants)
    $.ajax(
        {
           method: "POST",
           url: "http://localhost:3000/checkout",
           data: {
               date,
               restaurants,
               token: localStorage.getItem("token")
           }
        }
    )
        .then( (data) => {
            console.log(data)
            temp = []
        })
}

function searchFunction(){
    let name = $('.searchName').val()
    $.ajax({
        method : 'get',
        url : `http://localhost:3000/zomato/sr?name=${name}`
    })
        .done(function(data){
            console.log(data)
        })
}

function showList() {
    $.ajax (
        {
            method: "GET",
            url: "http://localhost:3000/dates"
        }
    )
    .then((result) => {
        console.log(result)
        $('#main-content').show()
        $('#main-content').empty()
        for (let i = 0; i < result.length; i++) {
            $("#main-content").append(`
            <div id="submit-date">
                <div class="card hitter p-2 border-bottom light-gray-bg" id="dateCard">
                    <div class="col lm-6">
                        <h5 class="card-title">${result[i].name}</h5>
                        <div>
                            <p class="card-text" id="tanggal">${result[i]["date"].iso}</p>
                        </div>
                        <div>
                            <span href="#" class="card-link">type: ${result[i]["type"][0]}</span>
                        </div>
                        </br>
                        <div>
                            <button class ="btn btn-primary" id="btn-submit" style="margin-bottom: 1rem" onclick="submitDate('${result[i]["date"].iso}')">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            `)
        }
        // submitDate()
    })
    .catch((err) => {
        console.log(err)
    });
}


function submitDate (date) {
    console.log(date)
    $('#dropdown-menu').empty()
    temp.push(date)
    $('#dropdown-menu').append(`
        <a class='dropdown-list'>${temp}</a>
    `)
    $('#main-content').hide()
    $('#restaurantId').show()
}



{/* <input type="text" name="search" class="searchName"><button onclick='serachFunction()'>Search</button> */}
