// Set the date we're counting down to
var countDownDate = new Date("October, 07, 2017 15:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

function initMap() {
    var uluru = { lat: 33.972294, lng: -116.981502 };
    var center = { lat: 33.950717, lng: -116.977291 }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        zoomControl: true,
        scaleControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: false,
        center: center,
        styles: [{ "stylers": [{ "hue": "#022445" }, { "visibility": "on" }, { "invert_lightness": true }, { "saturation": 40 }, { "lightness": 10 }] }]
    });

    var weddingmarker = {
        url: 'assets/img/weddingmarker.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30),
    }
    var hotelmarker = {
        url: 'assets/img/hotelmarker.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30),
    }

    var weddingMarker = new google.maps.Marker({
        icon: weddingmarker,
        position: uluru,
        map: map
    });

    google.maps.event.addListener(weddingMarker, 'dblclick', function () {
        window.open('https://www.google.com/maps/dir/?api=1&destination=33.972294,-116.981502');
    });

    var markers = [
        {
            "title": 'Holiday Inn & Suites',
            "lat": '33.946891',
            "lng": '-117.002104',
        },
        {
            "title": 'Motel 6',
            "lat": '33.928269',
            "lng": '-116.975974',
        },
        {
            "title": 'America\'s Best Value Inn',
            "lat": '33.927514',
            "lng": '-116.973957',
        },
        {
            "title": 'Rodeway Inn',
            "lat": '33.928880',
            "lng": '-116.96416',
        },
        {
            "title": 'Hampton Inn & Suites',
            "lat": '33.928032',
            "lng": '-116.943262',
        },
        {
            "title": 'Holiday Inn & Suites',
            "lat": '33.925237',
            "lng": '-116.909788',
        }
    ];
    window.onload = function () {
        initMap();
    }

    //Create and open InfoWindow.
    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < markers.length; i++) {
        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title,
            icon: hotelmarker
        });

        //Attach click event to the marker.
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow.setContent("<div style = 'width:100px;min-height:40px'>" + data.title + "</div>");
                infoWindow.open(map, marker);
            });
        })(marker, data);

        (function (marker, data) {
            google.maps.event.addListener(marker, "dblclick", function (e) {
                window.open('https://www.google.com/maps/dir/?api=1&destination=' + data.lat + ", " + data.lng);
            });
        })(marker, data);
    }
}