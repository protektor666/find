function SubmitFormData() {
    console.log('what');
    var rad = document.getElementById("rad").value
    var lat = document.getElementById("lat").value
    var lng = document.getElementById("lng").value
    var offset = document.getElementById("offset").value
    var count = document.getElementById("count").value
    $.post("showPhoto.php", { radius: rad, lat: lat, lng: lng, count: count, offset: offset },
    function(data) {
     $('footer').remove();
	 $('#results').html(data);
	 $('#results').append('<div id="footer">'+
      '<footer class="w3-container w3-center w3-opacity w3-light-grey ">'+
        '<p class="w3-medium"><a href="https://vk.com/xss_injection" target="_blank">Создатель</a></p>'+
        '</footer>'+
    '</div>');
    
    });
}
// query url //
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName('count') !== '') {
    $('#share').show()
    var count = getParameterByName('count');
    var rad = getParameterByName('rad'); 
    var lat = getParameterByName('lat'); 
    var lng = getParameterByName('lng'); 
    var offset = '';
    if( getParameterByName('offset') !== '' || getParameterByName('offset') !== null ) {
    var offset = getParameterByName('offset'); 
    $('#offset').val(offset);
    }
    
    $('#count').val(count);
    $('#rad').val(rad);
    $('#lat').val(lat);
    $('#lng').val(lng);

    jQuery(document).ready(function() {
        $.post("showPhoto.php", { radius: rad, lat: lat, lng: lng, count: count, offset: offset },
        function(data) {
    	 $('#results').html(data);
        });
    });
    
    sendCircleData(lat,lng,rad)
    
}
// scroll up //
jQuery(document).ready(function() {
  
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

});
/// generate share link //
$('#share').on('click', function(e) {
    console.log('ok');
    var rad = document.getElementById("rad").value
    var lat = document.getElementById("lat").value
    var lng = document.getElementById("lng").value
    var offset = document.getElementById("offset").value
    var count = document.getElementById("count").value
    
    var shareLink = document.getElementById("shareLink");
    shareLink.value = 'https://nearphoto.000webhostapp.com/?count='+ count +'&rad='+rad+'&lat='+lat+'&lng='+lng+'';
});


/// copy text //
function copyText() {
  var copyText = document.getElementById("shareLink");
  copyText.select();
  document.execCommand("copy");
}

/// share show/hide //

$('#count').on('change', function(e) {
    
if($('#count').val() !== "" && $('#rad').val() !== "" ) { $('#share').show() }

})

// footer

  $(document).ready(function() {

   var docHeight = $(window).height();
   var footerHeight = $('#footer').height();
   var footerTop = $('#footer').position().top + footerHeight;

   if (footerTop < docHeight) {
    $('#footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
   }
  });


