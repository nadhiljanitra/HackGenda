// $(document).ready(function(){
    $('#main-content').empty()
    $('#second-content').empty()
    $('#restaurantId').hide()
    $('#signout').hide()
    
    $('#register').hide();
    $('#btn-show').hide();
    $('#btnsearch').hide(); 
    $('.searchName').hide();
    $('#dropdownMenuButton').hide();
    $('#alertRegister').hide();

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
                        <p class='card-text'>${restaurants[i].avgcft}<br> kurs : ${currency}</p> 
                        <p class='card-text'>Total ${Math.round(restaurants[i].avgcft*currency)}</p>
                        <a  onclick='showImg(${restaurants[i].id})'><button target='xet' type="button" class="btn btn-outline-secondary")>Show Image</button></a>
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
    $('#second-content').empty();
}

function checkout(){
    $('#main-content').empty();

    for( let i=1;i<temp.length;i++ ){
        $('#second-content').append(`
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
            $('.dropdown-menu').empty();
        })
        .catch(console.log)
}

function searchFunction(){
    let name = $('.searchName').val()
    $.ajax({
        method : 'get',
        url : `http://localhost:3000/zomato/sr?name=${name}`
    })
        .done(function(restaurants){
            // console.log(restaurants)
            $('#main-content').empty();
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
                        <p class='card-text'>${restaurants[i].avgcft}<br>kurs : ${currency}</p> 
                        <p class='card-text'>Total ${Math.round(restaurants[i].avgcft*currency)}</p>
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


$(document).ready(test =>{
    console.log('dom is ready')
    $('#nationality').hide()
    $('#arrayInput').hide()
    // $('#signout').hide()
    $('#register').hide()
    $('#alertEmail').hide()
   })
  
  
  
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/signin',
      data : {
        id_token : id_token
      }
    })
    .done((token)=>{
      localStorage.setItem('token',token)
      $('.searchName').show();
      $('#dropdownMenuButton').show();   
      $('#btnsearch').show(); 
      $('#btn-show').show();
      
      $('#dropRegister').hide();
      $('#register').hide();
      $('#nationality').show()
      $('#signout').show()
      $('#signin').hide()
    })
    .fail((msg)=>{
      console.log('object');
      $('#alertEmail').show();
      $('#signin').hide()
      console.log(msg)
      // alert('belum terregister')
      // location.reload()
    })
    .always()
  }
  
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('token')
      location.reload()
    });
  }
  var currency
  $('#nationality').on('submit',(e)=>{
    e.preventDefault()
    negara = $('#nationalSelect').val()
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/currency',
      data : {
        negara : negara
      }
    })
    .done((newCurrency)=>{
      console.log("masuk done------------>");
      console.log(newCurrency)
      currency = newCurrency
    })
    .fail()
    .always(()=>{
      console.log("masuk always------------>");
    })
    console.log(negara);
  })
  
  
  $('#arrayInput').on('submit',(e)=>{
    e.preventDefault()
    let arr = $('#defaultCheck1').val()
    // let arr = ['1','2','3']
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/inputArr',
      data : {
        arr : arr
      }
    })
    .done(()=>{
    })
    .fail()
    .always(()=>{
      console.log("masuk always------------>");
    })
  })
  
  $('#register').on('submit',function(e){
    e.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/register',
      data : {
        email : email,
        password : password
      }
    })
    .done((user)=>{
      console.log(user);
      $('#register').show();
      $('#alertEmail').hide()
      $('#signin').show()
    })
    .fail((msg)=>{
        console.log("adadasd___----------------->>>");
        $('#alertRegister').show()
        console.log(msg)
    })
    .always(()=>{
      console.log("masuk always------------>");
    })
  })
  
  $('#dropRegister').click(()=>{
    $('#register').show()
  })
  
  