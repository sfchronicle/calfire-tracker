// this data is updated when Fire Tracker C2P is deployed
$.get("https://files.sfchronicle.com/project-feeds/FireData_2019.sheet.json", function (data) {
	// parse json data
	data = jQuery.parseJSON(data);

	// update date
	var updated = data[0].LastModDate_C2P;
	$('#updated').append(updated);

	// sort fires
	var majorFires = [];
	var minorFires = [];
	data.forEach(function(d) {
		if (d.MajorFire === "true") {
			majorFires.push(d);
		} else {
			minorFires.push(d);
		}
	});

	// show top 4 fires, prioritizing major fires
	var displayFires = majorFires.concat(minorFires).splice(0,4);

	// get fire data from each
	displayFires.forEach(function (fire) {

		var title = fire.FireName,
		slug = fire.FireName.replace(/[|&;$%@"<>()+,\s]+/g, '-').toLowerCase(),
		acreage = fire.Acreage,
		agency = fire.Agency,
		description = fire.Description,
		source = fire.Source,
		startDate = fire.StartDate.replace('January', 'Jan.').replace('February', 'Feb.').replace('August', 'Aug.').replace('September', 'Sept.').replace('October', 'Oct.').replace('November','Nov.').replace('December','Dec.'),
		containment = fire.Containment;

		// save each fire data html
		var fireDiv = "<div class='fire " + slug + "'>" + "<div class='title'>" + title + "</div>" + "<div class='meta'>" + "<div class='acreage'><span>Acres:</span> " + acreage + "</div>" + "<div class='containment'><span>Contained:</span> " + containment + "</div>" + "<div class='startdate'><span>Started:</span> " + startDate + "</div>" + "<div class='source'>Source: <a href='" + source + "' target='_blank'>" + agency + "</a></div>" + "</div></div>";

		// print each fire data html
		$('#fires').append(fireDiv);

	});
});

// don't show "full coverage" link if already on landing page
if (window.location.pathname === "/california-wildfires/") {
	document.getElementById("full-coverage").style.display = "none";
}
