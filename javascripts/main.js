
var lightModel = $(".light-model");
$(document).ready(function(){
	$(".layer").addClass("show-down");
	$(".title").addClass("show-up");

	$("#address").click(function(){
	    this.select();
	});

	$(".card").click(function(){
		lightModel.css("display", "flex");
		lightModel.transition({opacity: 1});
	})

	$(".mask").click(function(){
		lightModel.css("display", "none");
		lightModel.transition({opacity: 0});
	})





})

//nav
var bodyClass = document.body.classList,
    lastScrollY = 0;
window.addEventListener('scroll', function(){
  var st = this.scrollY;
  // 判斷是向上捲動，而且捲軸超過 200px
  if( st < lastScrollY) {
    bodyClass.remove('hide');
  }else{
    bodyClass.add('hide');
  }
  lastScrollY = st;
});


var map;
var markers = [];
var infoWindows = [];
var infoContent = [];
var searchResult;
var mapIcon = {
    	path: 'M69.896,6.767v-0.02c-0.134,0-0.265,0.008-0.396,0.008s-0.262-0.008-0.396-0.008v0.02  C42.327,7.193,20.748,29.016,20.748,55.895c0,36.221,42.526,70.601,48.752,75.486c6.227-4.884,48.752-39.266,48.752-75.486  C118.252,29.016,96.674,7.193,69.896,6.767z M69.896,77.036c-14.011,0-25.367-11.354-25.367-25.363  c0-14.013,11.356-25.369,25.367-25.369S95.264,37.66,95.264,51.673C95.264,65.682,83.907,77.036,69.896,77.036z',
    	fillColor: 'rgb(1, 95, 167)',
    	fillOpacity: 0.9,
    	strokeColor: 'rgb(0, 72, 127)',
    	strokeWeight: 1.5,
    	scale: 0.3
    }
var LatLng = [
		{lat: 25.043751, lng: 121.530372},
		{lat: 25.029084, lng: 121.505465},
		{lat: 25.014531, lng: 121.533433},
		{lat: 25.024600, lng: 121.521692},
		{lat: 25.033930, lng: 121.507348},
		{lat: 25.044921, lng: 121.523774},
		{lat: 25.038776, lng: 121.525504},
		{lat: 25.044810, lng: 121.516307},
		{lat: 25.046067, lng: 121.514009},
		{lat: 25.030985, lng: 121.517836},
		{lat: 24.987384, lng: 121.550561},
		{lat: 24.981929, lng: 121.561188},
		{lat: 24.987067, lng: 121.568602},
		{lat: 24.987922, lng: 121.574734},
		{lat: 25.002171, lng: 121.539137},
		{lat: 24.990077, lng: 121.541002},
		{lat: 25.001030, lng: 121.554531}
	];

var ntuHsopital = {lat: 25.040659, lng: 121.518990}
var nccu = {lat: 24.987574, lng: 121.575688}

var store = [
	{
		id: 0,
		name: '華山店',
		addr: '台北市中正區八德路一段34號',
		phone: '(02)2343-5777',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E8%8F%AF%E5%B1%B1%E5%BA%97/@25.0435999,121.52814,17z/data=!4m12!1m6!3m5!1s0x3442a97b69c15add:0xb57e79d0ed10167b!2zNTDltZDoj6_lsbHlupc!8m2!3d25.0435951!4d121.5303287!3m4!1s0x3442a97b69c15add:0xb57e79d0ed10167b!8m2!3d25.0435951!4d121.5303287?hl=zh-TW&authuser=0'
	},
	{
		id: 1,
		name: '南機場店',
		addr: '台北市中正區中華路二段309巷5號',
		phone: '(02)2309-2525',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E5%8D%97%E6%A9%9F%E5%A0%B4%E5%BA%97/@25.0286484,121.5034574,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a9bb27431899:0xad6749f55fed05fe!8m2!3d25.0286436!4d121.5056461?hl=zh-TW&authuser=0'
	},
	{
		id: 2,
		name: '公館店',
		addr: '台北市中正區汀州路三段116-1號',
		phone: '(02)2368-4599',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90/@25.0142258,121.5312764,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a98b10a1f343:0xb171ae156c9e9369!8m2!3d25.014221!4d121.5334651?hl=zh-TW&authuser=0'
	},
	{
		id: 3,
		name: '同安店',
		addr: '台北市中正區同安街32號',
		phone: '(02)2365-3381',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E5%90%8C%E5%AE%89%E5%BA%97/@25.0243108,121.5195833,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a990ecf389d7:0x1c9c47b75b5dc216!8m2!3d25.024306!4d121.521772?hl=zh-TW&authuser=0'
	},
	{
		id: 4,
		name: '小南門店',
		addr: '台北市中正區延平南路234號',
		phone: '(02)2388-2310',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90/@25.0245367,121.4867522,13z/data=!4m8!1m2!2m1!1zNTDltZDlsI_ljZfploDlupc!3m4!1s0x0:0x468afae02e7ede74!8m2!3d25.0309489!4d121.5178335?hl=zh-TW&authuser=0'
	},
	{
		id: 5,
		name: '捷運善導寺店',
		addr: '台北市中正區忠孝東路一段11號',
		phone: '(02)2351-8482',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E6%8D%B7%E9%81%8B%E5%96%84%E5%B0%8E%E5%AF%BA%E5%BA%97/@25.0449152,121.5216239,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a9777d455a7d:0x8afa848e22752b14!8m2!3d25.0449104!4d121.5238126?hl=zh-TW&authuser=0'
	},
	{
		id: 6,
		name: '杭州店',
		addr: '台北市中正區杭州南路一段95號',
		phone: '(02)2327-8206',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E6%9D%AD%E5%B7%9E%E5%BA%97/@25.0387961,121.5232953,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a9777d455a7d:0x38c7d18516f3a0ea!8m2!3d25.0387913!4d121.525484?hl=zh-TW&authuser=0'
	},
	{
		id: 7,
		name: '信陽店',
		addr: '台北市中正區信陽街13號',
		phone: '(02)2375-5886',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E4%BF%A1%E9%99%BD%E5%BA%97/@25.0447957,121.5141402,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a9777d455a7d:0x6ffb4109b455002e!8m2!3d25.0447909!4d121.5163289?hl=zh-TW&authuser=0'
	},

	{
		id: 8,
		name: '開封店',
		addr: '台北市中正區開封街一段9號',
		phone: '(02)2388-5600',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90+%E9%96%8B%E5%B0%81%E5%BA%97/@25.0460525,121.5118208,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a90cd5ec07eb:0xf82babbb6ce49b0c!8m2!3d25.0460477!4d121.5140095?hl=zh-TW&authuser=0'
	},

	{
		id: 9,
		name: '寧波店',
		addr: '台北市中正區開封街一段9號',
		phone: '(02)2388-5600',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90/@25.0309507,121.5156476,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a9993cc913a7:0x468afae02e7ede74!8m2!3d25.0309459!4d121.5178363?hl=zh-TW&authuser=0'
	},

	{
		id: 10,
		name: '衡陽店',
		addr: '台北市中正區衡陽路15號',
		phone: '(02)2370-4780',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E8%A1%A1%E9%99%BD%E5%BA%97/@25.0424293,121.5112927,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a9777d455a7d:0x7aa916a0051648d9!8m2!3d25.0424245!4d121.5134814?hl=zh-TW&authuser=0'
	},
	{
		id: 11,
		name: '試院店',
		addr: '台北市文山區木柵路一段86號',
		phone: '(02)2236-6327',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E8%A9%A6%E9%99%A2%E5%BA%97/@24.9873888,121.5483513,17z/data=!3m1!4b1!4m5!3m4!1s0x3442aa082628c449:0x2ea8a32093e37610!8m2!3d24.987384!4d121.55054?hl=zh-TW&authuser=0'
	},
	{
		id: 12,
		name: '木新店',
		addr: '台北市文山區木新路三段158號',
		phone: '(02)2937-7040',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90/@24.9818951,121.5590206,17z/data=!3m1!4b1!4m5!3m4!1s0x346801de353f38d9:0x3c161460846810e9!8m2!3d24.9818903!4d121.5612093?hl=zh-TW&authuser=0'
	},
	{
		id: 13,
		name: '木柵店',
		addr: '台北市文山區保儀路69號',
		phone: '(02)8661-3489',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E6%9C%A8%E6%9F%B5%E5%BA%97/@24.9870718,121.5663705,17z/data=!3m1!4b1!4m5!3m4!1s0x346801de353f38d9:0x19ad4e71264dfdf5!8m2!3d24.987067!4d121.5685592?hl=zh-TW&authuser=0'
	},
	{
		id: 14,
		name: '政大店',
		addr: '台北市文山區指南路二段63號',
		phone: '(02)8661-7571',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E6%94%BF%E5%A4%A7%E5%BA%97/@24.9879074,121.5725455,17z/data=!3m1!4b1!4m5!3m4!1s0x346801de353f38d9:0xe31b7404d1c2d068!8m2!3d24.9879026!4d121.5747342?hl=zh-TW&authuser=0'
	},
	{
		id: 15,
		name: '萬隆店',
		addr: '台北市文山區捷運萬隆站羅斯福路五段217號',
		phone: '(02)2930-4678',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90%E8%90%AC%E9%9A%86%E5%BA%97/@25.0021568,121.5369483,17z/data=!3m1!4b1!4m5!3m4!1s0x3442aa1d1753294d:0x8faa912887e2fdc!8m2!3d25.002152!4d121.539137?hl=zh-TW&authuser=0'
	},
	{
		id: 16,
		name: '景美店',
		addr: '台北市文山區景文街104號',
		phone: '(02)2935-7075',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90/@24.9901012,121.5388138,17z/data=!3m1!4b1!4m5!3m4!1s0x3468021dc6f2db8d:0xf0bab3648737d9af!8m2!3d24.9900964!4d121.5410025?hl=zh-TW&authuser=0'
	},
	{
		id: 17,
		name: '興隆店',
		addr: '台北市文山區興隆路二段349號',
		phone: '(02)2934-0688',
		link: 'https://www.google.com.tw/maps/place/50%E5%B5%90/@25.0009961,121.552321,17z/data=!3m1!4b1!4m5!3m4!1s0x346801de353f38d9:0x8c760b4ee37c0bb3!8m2!3d25.0009913!4d121.5545097?hl=zh-TW&authuser=0'
	}

]



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 25.011171, lng:  121.532823},
      zoom: 12
    });

    for(let i=0; i<store.length; i++){
    	infoContent[i] = '<div class="store" id="mapInner">'+
					'<div class="store-title">'+store[i].name+'</div>'+
					'<div class="store-detial addr">'+store[i].addr+'<a href="'+store[i].link+'" target="_blank"><img src="images/open.png"></a></div>'+
							'<div class="store-detial phone">'+store[i].phone+'</div></div>';
    	addMarker(i,store[i].name)
    	$(".store-content").append('<div class="store showup">'+
					'<div class="store-title">'+store[i].name+'</div>'+
					'<div class="store-detial addr">'+store[i].addr+'<a href="'+store[i].link+'" target="_blank"><img src="images/open.png"></a></div>'+
							'<div class="store-detial phone">'+store[i].phone+'</div></div>');

    }

	openInfoWindow();

	//search
	var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener("click", function() {
      $(".store-content").html(" ");
      var addrVal = $("#address").val();
      $(".store").removeClass("showup")

      if(addrVal === "台大醫院" || addrVal === "臺大醫院"){
      	for(let i=0; i<8; i++){
    	infoContent[i] = '<div class="store">'+
					'<div class="store-title">'+store[i].name+'</div>'+
					'<div class="store-detial addr">'+store[i].addr+'<a href="'+store[i].link+'" target="_blank"><img src="images/open.png"></a></div>'+
							'<div class="store-detial phone">'+store[i].phone+'</div></div>';
		$(".store-content").append(infoContent[i]);
			map.setCenter(ntuHsopital);
			map.setZoom(15);
			$(".store").addClass("showup")

			
    	}

    	var marker = new google.maps.Marker({
						    position: ntuHsopital,
						    map: map,
						    title: "臺大醫院"
						  });
      }else if(addrVal === "政大" || addrVal === "政治大學"){
      	for(let i=11; i<17; i++){
    	infoContent[i] = '<div class="store">'+
					'<div class="store-title">'+store[i].name+'</div>'+
					'<div class="store-detial addr">'+store[i].addr+'<a href="'+store[i].link+'" target="_blank"><img src="images/open.png"></a></div>'+
							'<div class="store-detial phone">'+store[i].phone+'</div></div>';
		$(".store-content").append(infoContent[i]);
			map.setCenter(nccu);
			map.setZoom(14);
			$(".store").addClass("showup")
    	}
    	var marker = new google.maps.Marker({
						    position: nccu,
						    map: map,
						    title: "政治大學"
						  });

      }else{
      	geocodeAddress(geocoder, map);
      }
    });

    $("#address").keyup(function(event){
    	event.preventDefault();
	    if(event.keyCode == 13){
	    	if($("#address").val() !== ""){
	    		$(".store-content").html(" ");
			      var addrVal = $("#address").val();

			      if(addrVal === "台大醫院" || addrVal === "臺大醫院"){
			      	for(let i=0; i<8; i++){
			    	infoContent[i] = '<div class="store">'+
								'<div class="store-title">'+store[i].name+'</div>'+
								'<div class="store-detial addr">'+store[i].addr+'<a href="'+store[i].link+'" target="_blank"><img src="images/open.png"></a></div>'+
										'<div class="store-detial phone">'+store[i].phone+'</div></div>';
					$(".store-content").append(infoContent[i]);
						map.setCenter(ntuHsopital);
						map.setZoom(15);
						$(".store").addClass("showup")
			    	}
			    	var marker = new google.maps.Marker({
						    position: ntuHsopital,
						    map: map,
						    title: "臺大醫院"
						  });
			      }else if(addrVal === "政大" || addrVal === "政治大學"){
			      	for(let i=11; i<17; i++){
			    	infoContent[i] = '<div class="store">'+
								'<div class="store-title">'+store[i].name+'</div>'+
								'<div class="store-detial addr">'+store[i].addr+'<a href="'+store[i].link+'" target="_blank"><img src="images/open.png"></a></div>'+
										'<div class="store-detial phone">'+store[i].phone+'</div></div>';
					$(".store-content").append(infoContent[i]);
						map.setCenter(nccu);
						map.setZoom(14);
						$(".store").addClass("showup")
						
			    	}

			    	var marker = new google.maps.Marker({
						    position: nccu,
						    map: map,
						    title: "政治大學"
						  });
			      }else{
			      	geocodeAddress(geocoder, map);
			      }
	    	}
	    }
	});

    //auto complete
    var input =(
    document.getElementById('address'));

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
    });

    autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
 //    if($("#address").val() !== ""){
 //    	if (!place.geometry) {
 //    		if(searchResult !== "")
	//         window.alert("Autocomplete's returned place contains no geometry");
	//         return;
	//     }	
	// }
    

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      //map.fitBounds(place.geometry.viewport);
      map.setZoom(15); 
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); 
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

    //icon
    
}


function addMarker(i,title){
	markers[i] = new google.maps.Marker({
	    position: LatLng[i],
	    icon: mapIcon,
	    map: map,
	    title: title
	  });
	infoWindows[i] = new google.maps.InfoWindow({
    content: infoContent[i]
  });
}

function openInfoWindow(){
	for(let i = 0; i<infoWindows.length; i++){
		markers[i].addListener('click', function() {
	    infoWindows[i].open(map, markers[i]);
	});
	}
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      searchResult = results[0].geometry.location;
      map.setZoom(15); 
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      // alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
