function draw_geojson_feature(id, feature){
	window.addEventListener('resize', function(){
		draw_geojson_feature_in(id, feature);
	});
	draw_geojson_feature_in(id, feature);
}

function draw_geojson_feature_in(id, feature){
	var data = JSON.parse(feature)["geometry"]["coordinates"][0];
	var div = document.getElementById(id);
	div.innerHTML = "";
	var xMin = Infinity;
	var yMin = Infinity;
	var xMax = 0;
	var	yMax = 0;
	var width = div.offsetWidth;
	var height = div.offsetHeight;
	
	for(let index = 0; index<data.length; index++){
		if(data[index][0] < xMin) xMin = data[index][0];
		if(data[index][1] < yMin) yMin = data[index][1];

		if(data[index][0] > xMax) xMax = data[index][0];
		if(data[index][1] > yMax) yMax = data[index][1];
	}

	var xRange = d3.scaleLinear()
		.range([width, 0])
		.domain([xMax, xMin]);
	var yRange = d3.scaleLinear()
		.range([height, 0])
		.domain([yMin, yMax]);
	
	var svg = d3.select("#"+id).append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.selectAll("polygon").data([data]).enter()
		.append("polygon")
		.attr("points", function(d){
			return d.map(function(d){
				return [xRange(d[0]), yRange(d[1])].join(",")
			}).join(" ");
		})
		.attr("stroke", '#000000')
		.attr("stroke-width", 2)
		.attr("fill", "white");
}
