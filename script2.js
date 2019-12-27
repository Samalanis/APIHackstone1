// geolocaton url 

// api url key 
let key = 'AIzaSyDHp5LgUc_PfgXkM0mJlVXcp_Wfik-__BE';
// movie theater near by pull 


// function to retrieve the zipcode
function getZip() {
    $("#zipSubmit").on('click', event => {
        event.preventDefault();
        let zipCode = $('#zipEnter').val();
        console.log(`THE ZIP CODE ENTERED IS: ${zipCode}`);

        let zipCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${key}`;
        console.log(`ZIPCODE URL: ${zipCodeUrl}`);

        if (zipCode == "")
            alert("Zipcode field is empty.");
        else {
            loadJsonZip(zipCodeUrl);
        };
    })

}

// function for getting the geo location data
function loadJsonZip(zipUrl) {
    console.log("LOADJSONZIP is running.");
    fetch(zipUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            //possible alert input here
        })
        .then(responseJson => resultsJsonZip(responseJson))
        .catch(err => {
            $('#errorHandle').text(`Something went wrong: ${err.message}`);
        })
}

// function to retrieve the results for Zipcode Json file
function resultsJsonZip(responseJson) {
    console.log(responseJson);
    //getting the specific results from the JSON file.
    let latitude = responseJson.results[0].geometry.location.lat;
    let longitude = responseJson.results[0].geometry.location.lng;
    console.log(longitude);
    console.log(latitude);
    loadJsonPlaces(latitude, longitude);
}


// function to pass another fetch to with the geolocation data
function loadJsonPlaces(x, y) {
    console.log("LOADJSONPLACES is running");
    let longitude = x;
    let latitude = y;
    let movieUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${x},` + " " + `${y}&radius=10000&type=movie_theater&key=${key}`;
    console.log(movieUrl);


    fetch(movieUrl, {
        mode: 'no-cors'})
        .then(response => {
            if (repsonse.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => showTheaters(responseJson))
        .catch(err => {
            $('#errorHandle').text(`Something went wrong: ${err.message}`)
        })
}

// function to append the results on the screen.
function showTheaters(theaterResults) {
    console.log(theaterResults);
}







function renderFunct2() {
    $(getZip);
}

renderFunct2();