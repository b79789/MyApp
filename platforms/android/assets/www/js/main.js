document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    $("#myNewSubmit").on("click", newFn);
    $("#geoMe").on("click", getMyGEo);
    //$("#mapMe").on("click", mymapFn);
    $("#takePic").on("click", capturePhoto);
    $("#page6").on("click", getMyCompass);
    $("#page7").on("click", myContactFn);
} // phonegap deviceready


// instagram api function^^^^^^^^^^^^
var newFn = function () {
    console.log("Firing!");
    var myTags = $("#myInstagramSearch").val();
    console.log(myTags);
    var url = "https://api.instagram.com/v1/tags/" + myTags + "/media/recent?&access_token=37026479.f59def8.473e0665cc5b469e9d492070a0fd1da8";
    $.getJSON(url, newPage);
    return false;
}; // end of function            

var newPage = function (info) {

    alert("Instagram Works!!");
    console.log(info);

    $.each(info.data, function (index, photo) {
        var pic = "<li><img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "'style=width:100%;height:100%; /><h4>" + " <em>" + photo.user.username + "</em></h4></li>";

        $("#page2li").append(pic);
    }); // end of each
}; // end of newPage function




// map function ^^^^^^^^^^^^^^
var mymapFn = function () {

}
//geo function^^^^^^^^^^^
    function getMyGEo() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };


function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML =
        'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        'Altitude: ' + position.coords.altitude + '<br />' +
        'Accuracy: ' + position.coords.accuracy + '<br />' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
        'Heading: ' + position.coords.heading + '<br />' +
        'Speed: ' + position.coords.speed + '<br />' +
        'Timestamp: ' + position.timestamp + '<br />';
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}


//camera function^^^^^^^^^^^^^^^

//Get picture function
var pictureSource; // picture source
var destinationType; // sets the format of returned value

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        saveToPhotoAlbum: true
    });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 20,
        allowEdit: true,
        saveToPhotoAlbum: true
    });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}


// compass function^^^^^^^^^^^^^^^

var watchID = null;

var getMyCompass = function () {

    startWatch();


    // Start watching the compass
    //
    function startWatch() {

        // Update compass every 3 seconds
        var options7 = {
            frequency: 3000
        };

        watchID = navigator.compass.watchHeading(onSuccess7, onError7, options7);
    }

    // Stop watching the compass
    //
    function stopWatch() {
        if (watchID) {
            navigator.compass.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get the current heading
    //
    function onSuccess7(heading) {
        var element = document.getElementById('heading');
        element.innerHTML = 'Heading: ' + heading.magneticHeading;
        alert("Compass Worked")
    }

    // onError: Failed to get the heading
    //
    function onError7(compassError) {
        alert('Compass error: ' + compassError.code);
    }
    return false;
}


// my contacts function ^^^^^^^^^^^^^^^^

var myContactFn = function () {
    var myContact = navigator.contacts.create({
        "displayName": "Test User"
    });
    myContact.note = "This contact has a note.";
    console.log("The contact, " + myContact.displayName + ", note: " + myContact.note);

    var options8 = new ContactFindOptions();
    options8.filter = "Bob";
    var fields = ["displayName", "name"];
    navigator.contacts.find(fields, onSuccess8, onError8, options8);

    function onSuccess8(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            console.log("Display Name = " + contacts[i].displayName);
        }
        alert("Contacts work")
    }

    // onError: Failed to get the contacts

    function onError8(contactError) {
        alert('onError!');
    }
}