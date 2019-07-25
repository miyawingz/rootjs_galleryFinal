/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];

function initiateApp() {
	/*advanced: add jquery sortable call here to make the gallery able to be sorted
		//on change, rebuild the images array into the new order
	*/
	makeGallery(pictures);
	// makeGalleryClone(pictures);
	addModalCloseHandler();
	sortableGallery();

	// retrieve sorted order of pictures before refresh and display if available
	// if (currentOrderArray) {
	//  makeGallery(currentOrderArray);
	// } else {
	//  makeGallery(pictures);
	// }
}

function makeGallery(imageArray) {
	//use loops and jquery dom creation to make the html structure inside the #gallery section

	//create a loop to go through the images in the imageArray
	//create the elements needed for each picture, store the elements in variable
	//attach a click handler to the figure you create.  call the "displayImage" function.  
	//append the element to the #gallery section
	// side note: make sure to remove the hard coded html in the index.html when you are done!
	// using for loop and usual DOM creation method

	//using foreach & using template for DOM creation
	imageArray.forEach(function (value) {
		var picture = value;
		var figcaption = picture.substring(7);
		var raw = $("#figTemplate").html();
		var figTemp = $(raw);
		figTemp.addClass("imageGallery col-xs-12 col-sm-6 col-md-4")
			.css({ "background-image": "url(" + picture + ")" });
		$("figcaption", figTemp).text(figcaption);
		$(figTemp).on("click", displayImage);
		$("#gallery").append(figTemp);
	})
}

// using for loop and usual DOM creation method
function makeGalleryClone(imageArray) {
	for (var i = 0; i < imageArray.length; i++) {
		var picture = imageArray[i];
		var figcaption = picture.substring(7);
		var figure = $("<figure></figure>");
		figure.addClass("imageGallery col-xs-12 col-sm-6 col-md-4")
			.css("background-image", "url(" + picture + ")")
			.html("<figcaption>" + figcaption + "</figcaption>");
		$(figure).on("click", displayImage);
		$("#gallery").append(figure);
	}
}

function addModalCloseHandler() {
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp	
	$(".modal-body img").on("click", function () {
		$("#galleryModal").modal("hide");
	})
}

function displayImage() {
	//find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need
	var url = $(this).css("background-image");
	url = url.replace('url("', "").replace('")', "");

	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
	// pexels-photo-132037
	//take a look at the lastIndexOf method
	var index1 = url.lastIndexOf("/");
	var index2 = url.lastIndexOf(".")
	var name = url.slice(index1 + 1, index2);

	//change the modal-title text to the name you found above
	//change the src of the image in the modal to the url of the image that was clicked on
	$(".modal-title").text(name);
	$(".modal-body img").attr("src", url);

	//show the modal with JS.  Check for more info here: 
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$("#galleryModal").modal("show");
}

// make each image sortable with the jquery UI sortable method
function sortableGallery() {
	$("#gallery").sortable();
	$("#gallery").on("sortstop", currentOrder);
}

// after the images are sorted (dragged)
// fill an array with the images in their current order (hint, use the src)
// store them into localstorage
function currentOrder() {
	// inefficient method
	// create empty array, loop through currenty figures, extract url, push into array
	// use sortable built in method toArray
	// toArray by default return ID, can change to different attribute
	var order = $("#gallery").sortable("toArray", { attribute: "style" });
	$.each(order, function (index, value) {
		var index1 = value.lastIndexOf('("');
		var index2 = value.lastIndexOf('")');
		value = value.slice(index1 + 2, index2);
		order[index] = value;
	})
	localStorage.setItem("currentOrder", JSON.stringify(order));
}

var currentOrderString = localStorage.getItem("currentOrder");
var currentOrderArray = JSON.parse(currentOrderString);
console.log(currentOrderArray);






