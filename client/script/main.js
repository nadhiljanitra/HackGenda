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
    $('#nationality').show()
    $('#signout').show()
    $('#signin').hide()
  })
  .fail((msg)=>{
    console.log('object');
    $('#alertEmail').show()
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

$('#nationality').on('submit',(e)=>{
  e.preventDefault()
  let negara = $('#nationalSelect').val()
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
    $('#register').hide()
  })
  .fail((msg)=>{
    console.log(msg)
  })
  .always(()=>{
    console.log("masuk always------------>");
  })
})

$('#dropRegister').click(()=>{
  $('#register').show()
})

