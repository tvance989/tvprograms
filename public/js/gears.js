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
	var numTeeth = 24; // PITCH DIAMETER (D) is the diameter of the pitch circle. In parallel shaft gears, the pitch diameters can be determined directly from the center distance and the number of teeth.
	var pressureAngle = 20; // PRESSURE ANGLE (ø) is the angle at a pitch point between the line of pressure which is normal to the tooth surface, and the plane tangent to the pitch surface. In involute teeth, pressure angle is often described also as the angle between the line of action and the line tangent to the pitch circle. Standard pressure angles are established in connection with standard gear-tooth proportions.
	var diametralPitch = numTeeth / pitchDiameter; // DIAMETRAL PITCH (P) is the ratio of the number of teeth to the pitch diameter.
	//var toothThickness = 1.5708 / diametralPitch; // at pitch diameter (D)
	var toothThickness = 180 / numTeeth; // at pitch diameter (D)

	var gear = paper.set();

	// PITCH CIRCLE is the circle derived from a number of teeth and a specified diametral or circular pitch. Circle on which spacing or tooth profiles is established and from which the tooth proportions are constructed.
	/*
	var pitchCircle = paper.circle(0, 0, pitchDiameter);
	pitchCircle.attr("stroke-dasharray", ". ");
	gear.push(pitchCircle);
	*/

	var B = toothThickness;
	var b = B / 2;
	var h = B / (4*Math.tan(pressureAngle * Math.PI / 180));
	console.log(B); console.log(h); console.log(b);
	for(var i = 0; i < numTeeth; i++) {
		var deg = i * 360 / numTeeth;
		var tooth = paper.path("M"+(-B/2)+","+(-h/2)+"L"+(-b/2)+","+(h/2)+"L"+(b/2)+","+(h/2)+"L"+(B/2)+","+(-h/2)+"Z");
		tooth.transform("r"+deg+"t"+pitchDiameter+",0r-90");
		tooth.attr("fill", "#777");
		gear.push(tooth);
	}

	var circleThickness = 5;
	var baseCircle = paper.circle(0, 0, pitchDiameter - h/2 - circleThickness/2);
	baseCircle.attr("stroke-width", circleThickness);
	gear.push(baseCircle);

	gear.attr("stroke", "#777");

	paper.clear();

	$("#gear-input").keyup(function(){
		paper.clear();

		var dir = 1;
		for(var i = 0; i < $(this).val().length; i++) {
			var cx = pitchDiameter * (2 * i + 1) + 10;
			var cy = pitchDiameter + 10;
			var temp = gear.clone().transform("R"+((i/2)*360/numTeeth)+"...T"+cx+","+cy);
			temp.animate({transform: "...R"+(360 * dir)+","+cx+","+cy+""}, 8000);
			dir *= -1;
		}
	})
})
