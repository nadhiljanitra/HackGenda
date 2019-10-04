// $(document).ready(function(){
    $('#main-content').empty()
    $('#second-content').empty()
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
    $('.dropdown-menu').empty()
    temp.push(name)
    for(let i=0;i<temp.length;i++){
        $('.dropdown-menu').append(`
            <a class="dropdown-item ${temp[i]}" onclick='removeItem()' >${temp[i]}</a>
        `)
    }
    $('.dropdown-menu').append(`
    <a class='dropdown-item'><button type="button" onclick="removeItem()">Reset All</button></a>
    
    `)
}

function removeItem() {
    $(`.dropdown-item`).empty();
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




{/* <input type="text" name="search" class="searchName"><button onclick='serachFunction()'>Search</button> */}
