$().ready(function () {

	// adapted from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

	$(".optionLabel > input").change(resetRadioStates);
});

var resetRadioStates = function(){
	$(".optionLabel > input:checked").parent().addClass("selected");
	$(".optionLabel > input:not(:checked)").parent().removeClass("selected");
};
