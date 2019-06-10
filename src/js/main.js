(function(){
var _$main_1 = {};
'use strict';

// https://sfc-project-files.s3.amazonaws.com/project-feeds/fire_tracker_c2p_firedata_2019.json
// C2P UPDATES BELOW URL ON DEPLOY, BUT UNABLE TO PARSE
// https://files.sfchronicle.com/project-feeds/FireData_2019.sheet.json
$.get("https://files.sfchronicle.com/project-feeds/FireData_2019.sheet.json", function (data) {

	// DON'T HAVE LAST UPDATED FIELD IN JSON FILE, SO JUST RETURNING CURRENT TIME FOR NOW
	// update date
	// var updated = data[0].Update;
	var updated = new Date();
	$('#updated').append(updated);

	// get the first 4 fires
	var fires = data.splice(0, 4);

	// get fire data from each
	fires.forEach(function (fire) {

		var title = fire.FireName,
		    slug = fire.FireName.replace(/[|&;$%@"<>()+,\s]+/g, '-').toLowerCase(),
		    acreage = fire.Acreage,
		    agency = fire.Agency,
		    description = fire.Description,
		    source = fire.Source,
		    startDate = fire.StartDate,
		    containment = fire.Containment;

		// save each fire data html
		var fireDiv = "<div class='fire " + slug + "'>" + "<div class='title'>" + title + "</div>" +
		// "<div class='description'><p>" + description + "</p></div>" +
		"<div class='meta'>" + "<div class='acreage'><span>Acres:</span> " + acreage + "</div>" + "<div class='containment'><span>Contained:</span> " + containment + "</div>" + "<div class='startdate'><span>Started:</span> " + startDate + "</div>" + "<div class='source'>Source: <a href='" + source + "' target='_blank'>" + agency + "</a></div>" + "</div></div>";

		// print each fire data html
		$('#fires').append(fireDiv);
	});
});

}());
