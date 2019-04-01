  // Initial array of movies
  var gifsArray = ["Cats", "Dogs", "The Office", "Funny"];

  // Function for dumping the JSON content for each button into the div
  function displayGifInfo() {

    var gif = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=Do0obuG0reFss2eMQBowwUGByV399wqw";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results= response.data;
      for (var i = 0; i < results.length; i++) {
        //variables
        var gifDiv = $("<div class='float-left text-center'>");
        var still = results[i].images.fixed_height_still.url
        var animate = results[i].images.fixed_height.url
        var rating = results[i].rating;
        //grabs rating and sets it to a paragraph tag
        var p = $("<p>").text("Rating: " + rating);
        //grabs the gif and puts it in a img tag
        var personImage = $("<img class='gifs' data-still ='" + still + "' data-animate='" + animate + "' >");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        //places the paragraph tag & the actual gif into the gifDiv
        gifDiv.prepend(p);
        gifDiv.prepend(personImage);
        //Placing the gifDiv into the html and onto the page
        $("#gifs-appear-here").prepend(gifDiv);
      }
      $(".gifs").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the buttons prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifsArray.length; i++) {

      // Then dynamically generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of gif to our button
      a.addClass("gif btn-outline-dark");
      // Adding a data-attribute
      a.attr("data-person", gifsArray[i]);
      // Providing the initial button text
      a.text(gifsArray[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding the gif from the textbox to our array
    gifsArray.push(gif);
   

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Function for displaying the gif info
  // Using $(document).on instead of $(".gif").on to add event listeners to dynamically generated elements
  $(document).on("click", ".gif", displayGifInfo);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();