// cant run modules locally. ??????
// so the solution is to run two pages in one file i guess

// data dictionary of pages to be pulled from elsewhere

// class of listing information to put in the map
class Listing {
	constructor(title, blurb, image, path, tags = []) {
		this.title = title;
		this.blurb = blurb;
		// image path for the thumbnail
		this.image = image;
		this.path = path;
		this.tags = tags;
	}
}

const listingMap = new Map();

listingMap.set(0, new Listing(
	"Fully Functional Frying Pan",
	"Fully functional frying pan ready for use in any kitchen",
	"image1.png",
	"fryingpan",
	["cooking"]));

listingMap.set(1, new Listing(
	"Sets of Bowls",
	"Vintage bowls available for pick-up",
	"image1.png",
	"bowls",
	["cooking"]));

listingMap.set(2, new Listing(
	"Silverware Sets",
	"Furnished silverware for sale, never used",
	"image1.png",
	"silverware",
	["cooking"]));

listingMap.set(3, new Listing(
	"Vintage second-hand car",
	"looking to sell older car",
	"image1.png",
	"car",
	["cooking"]));


const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("search"))

// main.html
const productDisplays = document.getElementsByClassName('product-display');

function addCards(length, filters, parent) {
	for (var v = 0; v <= length - 1; v++) {
		const data = listingMap.get(v);
		if (data == null) break;

		if (filters != "" || filters != null) {
			if (!data.title.includes(filters) && !data.blurb.includes(filters) && !data.tags.includes(filters)) {
				continue;
			}
		}

		const path = "./listings/" + data.path + "/"

		const div1 = document.createElement("div");
		div1.className += "col-sm-2";
		parent.append(div1);

		const div2 = document.createElement("div");
		div2.className += "card container";
		div1.append(div2);

		const img = document.createElement("img");
		img.className += "card-img-top preview-image img-fluid";
		img.src = path + data.image;

		const a = document.createElement("a");
		a.className += "card-title text-center";
		a.href = path + "listing.html";
		a.innerHTML = data.title;

		const p = document.createElement("p");
		p.className += "card-text";
		p.innerHTML = data.blurb;

		div2.append(img, a, p);
	}
}

for (var i = productDisplays.length - 1; i >= 0; i--) {
	if (document.title.includes("Home")) {
		const row = productDisplays.item(i).getElementsByClassName("row gx-5 row-cols-1")[0];
		addCards(6, "", row);
	} else if (document.title.includes("Marketplace")) {
		// search page should show everything when opened
		const row = productDisplays.item(i).getElementsByClassName("row row-cols-auto justify-content-evenly")[0];
		if (searchParams.get('search') != undefined) {
			addCards(listingMap.size, searchParams.get("search"), row);
		} else {
			addCards(listingMap.size, "", row);
		}
	}
}


// // for use in marketplace
// function searchFunction() {
// 	const row = productDisplays.item(0).getElementsByClassName("row row-cols-auto justify-content-evenly")[0];
// 	const searchbar = document.getElementById('searchbar');

// 	console.log("click");
// }

// document.getElementById("searchbar-btn").addEventListener("click", (e) => {
// 	e.preventDefault();
// 	searchFunction();
// });