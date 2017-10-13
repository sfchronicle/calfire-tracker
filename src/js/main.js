var FireModule = {
	init: function(){
		this.el = document.getElementById("hnp-fire-module") || false;
		if (!this.el) {
			console.log("Missing target el");
		}
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", this.process);
		oReq.open("GET", "http://extras.sfgate.com/editorial/wildfires/calfire.json");
		oReq.send();
	},
	process: function(r) {
		var self = FireModule;
		var response = r.target.responseText || false;
		if (response) {
			var json = JSON.parse(response);
			FireModule.render(json);
		} else {
			self.el.innerHTML = "<!-- Please refresh... -->";
		}
	},
	render: function(r) {
		console.log("process", r);
		var c = r.data.length;
		var h = [];
		var mostRecent = 0;
		var mostRecentText = "";
		for (var i=0; i<c; i++) {
			var item = r.data[i];
			var fireName = item.name;
			var tmp = item.name.indexOf("(");
			if (tmp > 1) {
				fireName = item.name.substring(0, item.name.indexOf("("));
			}
			var info = item.info.split(", ");
			var acres = info[0];
			var percent = info[1];
			var updateTime = new Date(item.updateTime);
			if (updateTime > mostRecent) {
				mostRecent = updateTime;
				mostRecentText = item.updateTime;
			}
			h.push([
				"<div class='fire' title=\"Updated: " + item.updateTime + "\">",
				  "<a href=\"" + item.link + "\" target=\"_blank\">",
				    "<h2>" + fireName + "</h2>",
				  "</a>",
				  "<p class='county'>" + item.county + "</p>",
				  "<p class='info'>" + acres + "</p>",
				  "<p class='info'>" + percent + "</p>",
				"</div>"
			].join("\n"));
		}
		var notesHTML = [
			"<div id=\"fire-footer\">",
			"<b>Updated</b>: " + mostRecentText + " ",
			"<b>Latest Info</b>: <a href=\"http://www.fire.ca.gov/current_incidents\" target=\"_blank\">Cal Fire Incidents</a>",
			"</div>"
		].join("");
		this.el.innerHTML = h.join("\n") + "\n" + notesHTML;
	}
};
FireModule.init();