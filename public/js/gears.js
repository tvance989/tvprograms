// http://dmitrybaranovskiy.github.io/raphael/reference.html
// http://www.bostongear.com/pdf/gear_theory.pdf
// https://www.bostongear.com/pdf/gearology/all_gearology-chapters.pdf
/*
 * Gear terms:
 * Diametral Pitch: the ratio of the number of teeth to the pitch diameter. (See Figure 2.2, 2.2B)
 * Pitch Circle: the imaginary circle that comes in contact with the imaginary circle of another gear when the two are in mesh. (See Figure 2.2A)
 * Pitch Diameter: the diameter of the pitch circle (See Figure 2.2B)
 *
 * Tooth Dimensions:
 * Addendum: the distance from the top of a tooth to the pitch circle. (See Figure 2.2C)
 * Dedendum: the distance from the pitch circle to the root circle. It equals the addendum + the working clearance. (See Figure 2.2C)
 * Whole Depth: the distance from the top to the bottom of the gear tooth.
 * Working Depth: the total depth of a tooth space. It is equal to the addendum + the dedendum (or the working depth + the variance).
 * Working Clearance: the distance from the working depth to the root circle. (See Figure 2.2C)
*/

/*
process:

draw gear
	draw teeth around circle
		draw tooth
			=define a shape with points. fill shape with color.
	draw circle
		=thick-path circle around a point
draw letter
	=define points/paths that form the letter
*/

$(function(){
	$("#gear-input").focus();
	var paper = Raphael("gear-output", 1000, 200);

	var pitchDiameter = 50; // PITCH DIAMETER (D) is the diameter of the pitch circle. In parallel shaft gears, the pitch diameters can be determined directly from the center distance and the number of teeth.
	var numTeeth = 20; // PITCH DIAMETER (D) is the diameter of the pitch circle. In parallel shaft gears, the pitch diameters can be determined directly from the center distance and the number of teeth.
	var diametralPitch = numTeeth / pitchDiameter; // DIAMETRAL PITCH (P) is the ratio of the number of teeth to the pitch diameter.
	var toothThickness = 1.5708 / diametralPitch; // at pitch diameter (D)

	var gear = paper.set();

	// PITCH CIRCLE is the circle derived from a number of teeth and a specified diametral or circular pitch. Circle on which spacing or tooth profiles is established and from which the tooth proportions are constructed.
	var pitchCircle = paper.circle(0, 0, pitchDiameter);
	pitchCircle.attr("stroke-dasharray", "- ");
	//gear.push(pitchCircle);

	//.use 20 deg pressure angle
	var b = toothThickness - 2;
	var B = toothThickness + 2;
	var h = B;
	for(var i = 0; i < numTeeth; i++) {
		var deg = (360 / numTeeth) * i;
		var tooth = paper.path("M"+(-B/2)+","+(-h/2)+"L"+(-b/2)+","+(h/2)+"L"+(b/2)+","+(h/2)+"L"+(B/2)+","+(-h/2)+"Z");
		tooth.transform("r"+(i * 360 / numTeeth)+"t"+pitchDiameter+",0r-90");
		gear.push(tooth);
	}

	var baseCircle = paper.circle(0, 0, pitchDiameter - h/2);
	gear.push(baseCircle);

	gear.attr("stroke", "#777");

	paper.clear();

	$("#gear-input").keyup(function(){
		paper.clear();

		for(var i = 0; i < $(this).val().length; i++) {
			var temp = gear.clone().transform("R"+((i/2)*360/numTeeth)+"...T"+(pitchDiameter * (2 * i + 1) + 10)+","+(pitchDiameter + 10));
		}
	})


	/*
	var gearRadius = 42;
	var toothLength = 10;
	var paperPadding = toothLength * 2;

	$("#gear-input").keyup(function(){
		paper.clear();

		for(var i = 0; i < $(this).val().length; i++) {
			drawGear(
				2 * gearRadius * (1 + i) + paperPadding + (i * 2 * toothLength),
				gearRadius + paperPadding,
				gearRadius
			);
		}
	})

	function drawGear(x, y, r) {
		// circle
		var circle = paper.circle(x, y, r);
		circle.attr("stroke", "#999");
		circle.attr("stroke-width", toothLength);

		// teeth
		var circle = paper.circle(x, y, r + toothLength);
		circle.attr("stroke", "#999");
		circle.attr("stroke-width", toothLength);
		circle.attr("stroke-dasharray", ". ");
		circle.attr("stroke-linecap", "square");
	}
	*/
})
