var father;
var getFather = function() {
	var childVal = document.getElementById("myCircle").innerHTML;
	var counter = 0;
	var tmp = 3*childVal + 1;
	document.getElementById("textCalc").innerHTML =  "3 &times <font color='steelblue'>"+childVal+"</font> + 1 = "+tmp;
	while (tmp%2 == 0) {
		tmp = tmp/2;
		counter ++;
	}
	document.getElementById("textCalc").innerHTML +=  "<br/><br/>" + tmp*Math.pow(2,counter) + "/2<sup>" + counter  + "</sup> = <font color='LightCoral'>" + tmp + "</font>";			
	return tmp;
};

var listener = function(e) {
switch(e.type) {
  case "webkitAnimationStart": 
	document.getElementById("restart").innerHTML = "Restart"; 			
	document.getElementById("continue").disabled = false;
	father = getFather(); 
	break; 
  case "webkitAnimationEnd": 			
	document.getElementById("myCircle").innerHTML =  father;
	if (father == 1) {				
		document.getElementById("myCircle").style.backgroundColor = "LightCoral";
		document.getElementById("continue").disabled = true;
	}					
	break; 
}};
var setup = function() {
								if (validateOddNumber(document.getElementById("oddNumber").value))
								{
									var e = document.getElementById("myCircle"); 										
									var newCircle = e.cloneNode(true);
									e.parentNode.replaceChild(newCircle, e);	
										newCircle.addEventListener("webkitAnimationStart", listener, false); 
										newCircle.addEventListener("webkitAnimationEnd", listener, false); 
										newCircle.addEventListener("webkitAnimationIteration", listener, false); 
										newCircle.className = 'run-bubble';
										newCircle.id = "myCircle";
										newCircle.style.backgroundColor = "lightsteelblue";											
										newCircle.innerHTML = document.getElementById("oddNumber").value;			
								}
};
var continueRun = function() {										
								var e = document.getElementById("myCircle"); 										
								var newCircle = e.cloneNode(true);
								e.parentNode.replaceChild(newCircle, e);	
									newCircle.addEventListener("webkitAnimationStart", listener, false); 
									newCircle.addEventListener("webkitAnimationEnd", listener, false); 
									newCircle.addEventListener("webkitAnimationIteration", listener, false); 
									newCircle.className = 'run-bubble';
									newCircle.id = "myCircle";																						
};	
function validateOddNumber(numberVal)
{
	var numExp = /^[0-9]+$/;	
	if(!numberVal)
	{
		$("#invalid_odd_number").html("Please enter an Odd number");
		$("#invalid_odd_number").show();
		$("#oddNumber").focus();
		return false;						
	}else if(!numberVal.match(numExp) || numberVal < 0 || (numberVal)%2 == 0)
	{				
		$("#invalid_odd_number").html("Value should consist of REAL-ODD-NUMBERS only");
		$("#invalid_odd_number").show();
		$("#oddNumber").focus();
		return false;				
	}else
	{
		$("#invalid_odd_number").hide();
		return true;
	}
}
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
var myD3Code = function() {

   var treeData = [
	  {
		"name": 1,
		"parent": "null"
	  }
	];
	// ************** Generate the tree diagram	 *****************
	var margin = {top: 20, right: 120, bottom: 20, left: 120},
		width = 2960 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;
		
	var i = 0,
		duration = 750,
		root;
	var tree = d3.layout.tree()
		.size([height, width]);
	var diagonal = d3.svg.diagonal()
		.projection(function(d) { return [d.y, d.x]; });
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	root = treeData[0];
	root.x0 = height / 2;
	root.y0 = 0;
	  
	update(root);
	d3.select(self.frameElement).style("height", "500px");
	function update(source) {
	  // Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse(),
		  links = tree.links(nodes);
	  // Normalize for fixed-depth.
	  nodes.forEach(function(d) { d.y = d.depth * 180; });
	  // Update the nodes…
	  var node = svg.selectAll("g.node")
		  .data(nodes, function(d) { return d.id || (d.id = ++i); });
	  // Enter any new nodes at the parent's previous position.
	  var nodeEnter = node.enter().append("g")
		  .attr("class", "node")
		  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
		  .on("click", click);
	  nodeEnter.append("circle")
		  .attr("r", 1e-6)
		  .style("fill", function(d) { return d.name%3==0 ? "#fff" : "lightsteelblue"; });
	  nodeEnter.append("text")
		  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
		  .attr("dy", ".35em")
		  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
		  .text(function(d) { return d.name; })
		  .style("fill-opacity", 1e-6);
	  // Transition nodes to their new position.
	  var nodeUpdate = node.transition()
		  .duration(duration)
		  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
	  nodeUpdate.select("circle")
		  .attr("r", 10)
		  .style("fill", function(d) { return d.name%3==0 ? "#fff" : "lightsteelblue"; });
	  nodeUpdate.select("text")
		  .style("fill-opacity", 1);
	  // Transition exiting nodes to the parent's new position.
	  var nodeExit = node.exit().transition()
		  .duration(duration)
		  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
		  .remove();
	  nodeExit.select("circle")
		  .attr("r", 1e-6);
	  nodeExit.select("text")
		  .style("fill-opacity", 1e-6);
	  // Update the links…
	  var link = svg.selectAll("path.link")
		  .data(links, function(d) { return d.target.id; });
	  // Enter any new links at the parent's previous position.
	  link.enter().insert("path", "g")
		  .attr("class", "link")
		  .attr("d", function(d) {
			var o = {x: source.x0, y: source.y0};
			return diagonal({source: o, target: o});
		  });
	  // Transition links to their new position.
	  link.transition()
		  .duration(duration)
		  .attr("d", diagonal);
	  // Transition exiting nodes to the parent's new position.
	  link.exit().transition()
		  .duration(duration)
		  .attr("d", function(d) {
			var o = {x: source.x, y: source.y};
			return diagonal({source: o, target: o});
		  })
		  .remove();
	  // Stash the old positions for transition.
	  nodes.forEach(function(d) {
		d.x0 = d.x;
		d.y0 = d.y;
	  });
	}
	// Toggle children on click.
	function click(d) {
	  if (d.children) {	
		d._children = d.children;
		d.children = null;	
	  } else {	
		d.children = d._children;
		d._children = null;	
	  }
	  
	  createTreeNode(d);
	  update(d);
	}
	function createTreeNode(source){

	var current_node = tree.nodes(source);

	var childNo = 1;
	if(current_node[0]._children!=null){	
		childNo = current_node[0]._children.length + 1;
	}

	if(current_node[0].name==1) {
		childNo = childNo + 1;
	}

	if(current_node[0].name%3==1){
		var myJSONObject = {"name": ((current_node[0].name*Math.pow(2,(2*childNo)))-1)/3,"children": [], "parent": current_node[0].name}; 
	} else if(current_node[0].name%3==2){
		var myJSONObject = {"name": ((current_node[0].name*Math.pow(2,(2*childNo)-1))-1)/3,"children": [], "parent": current_node[0].name}; 
	} else {
		return
	}

	if(myJSONObject.name >= Number.MAX_SAFE_INTEGER){
		return
	}
		
	if(current_node[0]._children!=null){	
		current_node[0]._children.push(myJSONObject);
		console.log("current_node[0].name = "+ current_node[0].name);
		source.children = source._children;
		source._children = null;
	}

	else if(current_node[0].children!=null && current_node[0]._children!=null){
		current_node[0].children.push(myJSONObject);	
	}

	else{
		current_node[0].children=[]
		current_node[0].children.push(myJSONObject);	
	}

	tree.links(current_node).push(current_node[current_node.length-1]);
	}
};	
loadScript("http://d3js.org/d3.v3.min.js", myD3Code);