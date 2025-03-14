// data dictionary of pages to be pulled from elsewhere

// class of listing information to put in the map
export class Listing {
	constructor(title, blurb, image, tags = []) {
		this.title = title;
		this.blurb = blurb;
		// image path for the thumbnail
		this.image = image;
		this.tags = tags;
	}
}

export const listingMap = new Map(String, Listing())

listingMap.set("fryingpan", new Listing(
	"Fully Functional Frying Pan",
	"Fully functional frying pan ready for use in any kitchen",
	"image1",
	["cooking"]))