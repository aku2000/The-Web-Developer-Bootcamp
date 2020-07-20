// Check off specific todos by clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});
//Click on X to delete to TODO
$("ul").on("click", "span", function(event) {
	event.stopPropagation();
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
});
//Add listener to text-input
$("input[type='text']").on("keypress", function(event) {
	if (event.which === 13) {
		//grab new text from input
		var todoText = $(this).val();
		//delete the new text from input box
		$(this).val("");
		//add this new li to ul
		$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " + todoText + "</li>");
	}
});

$(".fa-pencil").click(function() {
	$("input[type='text']").fadeToggle();
});
