var getMap;
$(document).ready(function() {
// write your code here

    var aSpots = [];

    $('#go-to-map').click(function() {
        $('html, body').animate({
            scrollTop: $('#map').offset().top
        },1000);
    });

    $('#go-to-top').click(function() {
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 1000);
    })

    $.getJSON( 'data.json', function ( data ) {
        $.each(data, function( i, val ) {
            aSpots.push(val);
            drawRows(val);
        });
    });

    function drawRows( input ) {
        $('table tbody').append('<tr><td>' + input.name + '</td>' + '<td>' + input.description + '</td>' + '<td><a class="btn" href="https://www.google.com/maps?q=' + input.location[0] + ',' + input.location[1] + '" target="_blank">Open&nbsp;in&nbsp;Google&nbsp;Maps</a></td></tr>');
    }

    getMap = function () {
        var origin = { lat: 32.709, lng: -117.156 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8.5,
            center: origin
        });
        var marker = new google.maps.Marker({
            position: origin,
            map: map
        });

        $.each( aSpots, function( i, val ) {
            var spotMarker = new google.maps.Marker({
                position: { lat: val.location[0], lng: val.location[1] },
                map: map
            });
        });
    }
    getMap();

});
