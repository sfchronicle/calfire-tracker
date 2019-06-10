$.get("https://files.sfchronicle.com/project-feeds/FireData_2019.sheet.json", function (data) {

	// TODO: PARSE 'UPDATED' FIELD IN JSON FILE
	// when done, also uncomment .updated div

	// update date
	// var updated = data[0].Update;
	// $('#updated').append(updated);

	// TODO: PRIORITIZE MAJOR FIRES
	// get the first 4 fires
	var fires = jQuery.parseJSON(data).splice(0,4);

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
