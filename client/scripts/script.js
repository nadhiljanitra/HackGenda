function showList() {
    $.ajax (
        {
            method: "GET",
            url: "http://localhost:3000/dates"
        }
    )
    .then((result) => {
        console.log(result)
        for (let i = 0; i < result.length; i++) {
            $("#loop-date").append(`
            <div id="submit-date">
                <div class="card hitter p-2 border-bottom light-gray-bg">
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

// $(document).ready( () => {

// })

function submitDate (date) {
    console.log(date)
    $.ajax(
        {
            method: "POST",
            url: "http://localhost:3000/dates",
            data: {
                date
            }
        }
    )
    .done( tanggal => {
        console.log(tanggal);   
    })
    .fail( err => {
        console.log(err)
    })
    .always( () => {
        console.log("masuk always");    
    })
}

// $("#btn-submit").on("click", (e) => {
//     console.log('msduk')
//     e.preventDefault();
//     let tanggal = $("#tanggal").val()
//     $.ajax(
//         {
//             method: "POST",
//             url: "http://localhost:3000/dates",
//             data: {
//                 tanggal: tanggal
//             }
//         }
//     )
//     .done( tanggal => {
//         console.log(tanggal);   
//     })
//     .fail( err => {
//         console.log(err)
//     })
//     .always( () => {
//         console.log("masuk always");    
//     })
    
// })