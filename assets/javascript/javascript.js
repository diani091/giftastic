$(document).ready(function(){
// Array of movies 
var topics = ["Whiplash", "IT", "Gone Girl", "Pulp Fiction", "The Wizard of Gore", "Mad Max",
"Suspiria", "Batman", "Pinapple Express", "Back to the Future"];
var numberOfGIFs = 10;
var cutOffRating = "PG";
var favorites = [];

function renderButtons(){
//Looping through the array of movies
	for(var i = 0; i < topics.length; i++) {

//Generating buttons
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("movie-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
    $(".movie-button").unbind("click");
    
//on click events for buttons

	$(".movie-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		populateGIFContainer($(this).text());
	});

}

function addButton(show){
	if(topics.indexOf(show) === -1) {
		topics.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(show){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show + 
		"&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
	// on click function that animates and pauses each gif
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

function favoritesButton(check_all_1){
	document.getElementById(check_all_1).checked = !document.getElementById(id).checked;
}

	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#movies").val().trim());
		$("#movies").val("");
	});
});