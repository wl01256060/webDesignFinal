$(document).ready(function(){
	$(".layer").addClass("show-down");
	$(".title").addClass("show-up");
})

var map;
var markers = [];
var infoWindows = [];
var infoContent = [];
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
		{lat: 25.042410, lng: 121.513482},
		{lat: 25.040138, lng: 121.531889},
		{lat: 25.050482, lng: 121.516691}
	];

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
	}


]

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 24.986276, lng:  121.576139},
      zoom: 13
    });

    for(let i=0; i<store.length; i++){
    	infoContent[i] = '<div class="store">'+
					'<div class="store-title">'+store[i].name+'</div>'+
					'<div class="store-detial addr">'+store[i].addr+'<a href="'+store[i].link+'" target="_blank"><img src="images/open.png"></a></div>'+
							'<div class="store-detial phone">'+store[i].phone+'</div></div>';
    	addMarker(i,store[i].name)
    }

	openInfoWindow();

	//search
	var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener("click", function() {
      geocodeAddress(geocoder, map);
    });
	}


function addMarker(i,title){
	markers[i] = new google.maps.Marker({
	    position: LatLng[i],
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
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
