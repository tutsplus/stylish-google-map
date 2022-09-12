let markers = [];
const activeClass = "active";
const pins = [
	{
		location: "North America",
		name: "Corporate headquarters",
		address: "345 Park Avenue <br> San Jose, CA 95110-2704",
		tel: "408-536-2800",
		fax: "408-537-6000",
		lat: 37.33078,
		long: -121.892357,
	},
	{
		location: "North America",
		name: "Los Angeles",
		address:
			"(former Magento office) <br> 3640 Holdrege Ave <br> Los Angeles, CA 90016",
		lat: 34.01989,
		long: -118.37811,
	},
	{
		location: "Asia",
		name: "China",
		address:
			"0909, 9/F, China World Tower <br> No. 1 Jian Guo Men Wai Avenue <br> Beijing 100004 <br> P.R. China",
		tel: "+86 10-5865 7700",
		fax: "+86 10-5865 7701",
		lat: 39.937967,
		long: 116.417592,
	},
	{
		location: "Asia",
		name: "China",
		address:
			"Unit 2027-2030, Mirae Asset Tower <br> No.166 Lujiazui Ring Road <br> Pudong New Area, Shanghai 200120",
		tel: "+86 21-8011 8228",
		fax: "+86 21-8011 8239",
		lat: 31.246027,
		long: 121.483385,
	},
	{
		location: "Asia",
		name: "India",
		address:
			"Plot No. 05, Block A, Sector-132 <br> Noida – 201304 <br> U.P. (India)",
		tel: "+91-120-4444711",
		fax: "+91-120-4444737",
		lat: 28.36416,
		long: 77.29214,
	},
	{
		location: "Asia",
		name: "India",
		address: "I-1A, Sector 25A <br> Noida, U.P. 201301 <br> India",
		tel: "+91 120 444 4711",
		fax: "+91 120 433 3427 or 433-3439",
		lat: 28.55702,
		long: 77.32624,
	},
	{
		location: "Europe",
		name: "Ireland",
		address: "6 Riverwalk, Naas Road <br> 24, Dublin <br> Ireland",
		tel: "+353 1 242 6700",
		fax: "+353 1 242 6711",
		lat: 53.33309,
		long: -6.32976,
	},
	{
		location: "Europe",
		name: "Netherlands",
		address:
			"Europlaza <br> Hoogoorddreef 54a <br> Amsterdam, 1101 BE <br> The Netherlands",
		tel: "+31 20 65 11 200",
		lat: 52.31124,
		long: 4.94606,
	},
	{
		location: "Europe",
		name: "Poland",
		address:
			"Warsaw Tower <br> 39, Sienna Street, 8th floor <br> 00-121 Warsaw, Poland",
		lat: 52.23185,
		long: 21.00182,
	},
	{
		location: "Europe",
		name: "Sweden",
		address:
			"Floor 7 <br> Master Samuelsgatan 36 <br> 111 57 Stockholm <br> Sweden",
		tel: "+46 8 752 3300",
		fax: "+46 8 751 4955",
		lat: 59.33403,
		long: 18.06626,
	},
	{
		location: "Europe",
		name: "Belgium",
		address: "Park Lane Culliganlaan 2F <br> 1B-1831 Diegem <br> Belgium",
		tel: "+32 2 416 40 00",
		lat: 51.21033,
		long: 5.239631,
	},
	{
		location: "Europe",
		name: "United Kingdom",
		address:
			"Market House <br> Maidenhead <br> SL6 8AD <br> United Kingdom",
		tel: "+44 1628 590 000",
		fax: "+44 1628 590 100",
		lat: 51.20623,
		long: -3.4787,
	},
	{
		location: "Europe",
		name: "United Kingdom",
		address:
			"White Collar Factory <br> 1 Old Street Yard <br> London <br> EC1Y 8AF",
		lat: 51.50135,
		long: 0.05067,
	},
];

// London, UK
const center = {
	lat: 51.507351,
	lng: -0.127758,
};

const styles = [
	{
		featureType: "poi",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "water",
		stylers: [
			{
				color: "#39C3FC",
			},
		],
	},
];

function initMap() {
	const map = new google.maps.Map(document.getElementById("map"), {
		center,
		styles,
		zoom: 3,
	});

	createMarkers(map);
	showLocations();
}

function createMarkers(map) {
	const infowindow = new google.maps.InfoWindow();
	const markerIcon = {
		url: "img/pin.svg",
		scaledSize: new google.maps.Size(40, 40),
	};

	for (let i = 0; i < pins.length; i++) {
		const marker = new google.maps.Marker({
			position: {
				lat: pins[i].lat,
				lng: pins[i].long,
			},
			map,
			icon: markerIcon,
			animation: google.maps.Animation.DROP,
		});

		markers.push(marker);

		google.maps.event.addListener(marker, "click", function () {
			infowindow.setContent(createInfoWindowContent(pins[i]));
			map.setCenter(marker.getPosition());
			infowindow.open(map, marker);
			const targetLocation = document.querySelector(
				`[data-index="${i}"]`
			);

			if (document.querySelector(".location.active")) {
				document
					.querySelector(".location.active")
					.classList.remove(activeClass);
			}
			targetLocation.classList.add(activeClass);
			scroll({
				top: targetLocation.offsetTop,
				behavior: "smooth",
			});
		});
	}
}

function createInfoWindowContent(pin) {
	let phoneString = "";
	let faxString = "";
	let latLongString = "";
	let addressString = "";

	if (pin.tel) {
		phoneString = `
			<p class="d-flex align-items-center">
				<img class="me-2" width="24" height="24" src="img/modal-tel.svg" alt="">
				${pin.tel}
			</p>
		`;
	}

	if (pin.fax) {
		faxString = `
			<p class="d-flex align-items-center">
				<img class="me-2" width="24" height="24" src="img/modal-fax.svg" alt="">
				${pin.fax}
			</p>
		`;
	}

	if (pin.lat && pin.long) {
		latLongString = `
			<p class="d-flex align-items-center">
				<img class="me-2" width="24" height="24" src="img/modal-lat-long.svg" alt="">
				${pin.lat}, ${pin.long}
			</p>
		`;
	}

	if (pin.address) {
		addressString = `
			<div class="d-flex">
				<img class="me-2" width="24" height="24" src="img/modal-pin.svg" alt="">
				${pin.address}
			</div>
		`;
	}

	const contentString = `
		<h3 class="fs-4 text">${pin.name}</h3>
		<hr>
		${phoneString}
		${faxString}
		${latLongString}
		${addressString}
	`;

	return contentString;
}

function showLocations() {
	const locations = document.querySelectorAll(".location");

	locations.forEach((location) => {
		location.addEventListener("click", function (e) {
			e.preventDefault();
			if (document.querySelector(".location.active")) {
				document
					.querySelector(".location.active")
					.classList.remove(activeClass);
			}
			location.classList.add(activeClass);
			scroll({
				top: document.getElementById("map").offsetTop,
				behavior: "smooth",
			});
			new google.maps.event.trigger(markers[this.dataset.index], "click");
		});
	});
}
