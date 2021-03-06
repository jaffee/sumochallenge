$().ready(function () {

	// adapted from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

	$(".optionField > input").change(updateOptionFields);
});



var getid = (function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return function() {
		return s4() + s4() + s4() + s4() +
			s4() + s4() + s4() + s4();
	};
})();


var getOption = function(){
	return $("<div  class='optionField'><input name='option_" + getid() + "' type='text' size=50/><button id='addoption' type='button', onclick='updateOptionFields()'>+</button> </div>");
};


var updateOptionFields = function(e){
	var lastOption = $(".optionField > input");
	lastOption = lastOption[lastOption.length - 1];
	$(".optionField > input").each(function (i, field) {
		if (!field.value && !(field.name == lastOption.name)) {
			$(field).parent().remove();
		}
	});


	lastOption = $(".optionField > input");
	lastOption = lastOption[lastOption.length - 1];
	if(lastOption.value){
		$("#addoption").remove();
		var newOpt = getOption();
		newOpt.insertAfter($(lastOption).parent());
		lastOption = $(".optionField > input");
		lastOption = lastOption[lastOption.length - 1];
		lastOption.focus();

		$(".optionField").unbind("change");
		$(".optionField").change(updateOptionFields);
	}
};
