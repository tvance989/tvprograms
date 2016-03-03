// http://dmitrybaranovskiy.github.io/raphael/reference.html

$(function(){
	$("#gear-input").focus();

	var gearRadius = 20;
	var paperPadding = 10;
	var paper = Raphael("gear-output", 1000, 200);

	$("#gear-input").keyup(function(){
		paper.clear();

		for(var i = 0; i < $("#gear-input").val().length; i++) {
			drawGear(
				2 * gearRadius * (1 + i) + paperPadding,
				gearRadius + paperPadding,
				gearRadius
			);
		}
	})

	function drawGear(x, y, r) {
			var circle = paper.circle(x, y, r);
			circle.attr("fill", "#bbb");
			circle.attr("stroke", "#f00");
	}
})
