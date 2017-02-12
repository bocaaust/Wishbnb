function getCredentials(callbackFunction) {
	//getGifCredentials();
  var data = {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
  };
  var url = 'https://api.clarifai.com/v1/token';

  return axios.post(url, data, {
    'transformRequest': [
      function() {
        return transformDataToParams(data);
      }
    ]
  }).then(function(r) {
    localStorage.setItem('accessToken', r.data.access_token);
    localStorage.setItem('tokenTimestamp', Math.floor(Date.now() / 1000));
    callbackFunction();
  }, function(err) {
    console.log(err);
  });
}

function

function transformDataToParams(data) {
  var str = [];
  for (var p in data) {
    if (data.hasOwnProperty(p) && data[p]) {
      if (typeof data[p] === 'string'){
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
      }
      if (typeof data[p] === 'object'){
        for (var i in data[p]) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p][i]));
        }
      }
    }
  }
  return str.join('&');
}





function postImage(imgurl) {
	
	
  var accessToken = localStorage.getItem('accessToken');
  var data = {
    'url': imgurl
  }; 
  var url = 'https://api.clarifai.com/v1/tag';
  return axios.post(url, data, {
    'headers': {
      'Authorization': 'Bearer ' + accessToken
    }
  }).then(function(r) {
    parseResponse(r.data);
  }, function(err) {
    console.log('Sorry, something is wrong: ' + err);
  });
}


/*function tagCloud(current){
	//console.log(localStorage.getItem('popularTags'));
	//console.log(localStorage.getItem('popularTags') === null);
		//console.log(localStorage.getItem('popularTags') === '');
	if (localStorage.getItem('popularTags') === 'empty' || localStorage.popularTags === undefined){
	
		
		var tags2 = [];
		var weights = [];
		for(i=0; i < current.length; i++){
			tags2[i] = current[i];
			weights[i] = 1;
		}
		
	}else{
		
		var tags2 = JSON.parse(localStorage.getItem('popularTags'));
	var weights = JSON.parse(localStorage.getItem('popularWeights'));
		//console.log(tags2.length)
		//console.log(current.length)
		//var i;
		for(i=0; i < current.length; i++){
			var notFound = true;
			//var n;
			for(n=0; n < tags2.length; n++){
				if(current[i] === tags2[n]){
					notFound = false;
					weights[n]++;
					break;
				}
			}
			if (notFound){
				tags2[tags2.length] = current[i];
				weights[weights.length] = 1;
			}
		}
	}
	localStorage.setItem('popularTags',JSON.stringify(tags2));
	localStorage.setItem('popularWeights',JSON.stringify(weights));
	if(document.getElementById('imgurl').value !== localStorage.getItem('imgurl') || document.getElementById('cloudSuggestion').hidden === true){
	generateCloud(tags2,weights);
	cloudGif(tags2,weights);
	}
}

function cloudGif(tags,weights){ 



	var tags = top(tags,weights);	



	var url = 'https://api.gfycat.com/v1test/gfycats/search?search_text=';

	axios.get(url + tags[0].toString() + ',' + tags[1].toString() + ',' + tags[2].toString() ).then(function(r) {

		//console.log(r.data.gfycats[Math.floor((Math.random() * 10))]);

		if (r.data.gfycats.length > 0){

		document.getElementById('cloudImage').src = r.data.gfycats[Math.floor((Math.random() * r.data.gfycats.length))].gifUrl;

	}else{

		document.getElementById('cloudImage').src = 'https://az853139.vo.msecnd.net/static/images/not-found.png';

	}
		document.getElementById('cloudImage').hidden = false;

		document.getElementById('cloudSuggestion').hidden = false;

	}, function(err) {

    console.log('Sorry, something is wrong: ' + err);

  });


	document.getElementById('popular').hidden = false;
	document.getElementById('cloudSuggestion').hidden = false;
	

} 



function top(tags,weights) {

	var output = [];
	var temp = weights;
	var check = 0;
	if (tags.length === 2){
		check = 1;
	}
	if (tags.length === 1){
		check = 2;
	}

	for (n = 0; n < 3 - check; n++){

		var position = highest(tags, temp);
		output[n] = tags[position];
		temp[n] = 0;

		

	}
	return output;

}



function highest(tags,weights) {

	var output = 0;

	for (i = 0; i < tags.length; i++){

		if (weights[i] > weights[output]){

			output = i;

		}

	}

	return output;

}

function altParse(){
	//document.getElementById('third').hidden = false;
	var tags = [];
	var resp = JSON.parse(localStorage.getItem('data'));
	 if (resp.status_code === 'OK') {
    var results = resp.results;
    tags = results[0].result.tag.classes;
		tagCloud(results[0].result.tag.classes);
  } else {
    console.log('Sorry, something is wrong.');
  }
	 document.getElementById('tags').innerHTML = tags.toString().replace(/,/g, ', ');
	var url = 'https://api.gfycat.com/v1test/gfycats/search?search_text=';
	axios.get(url + tags[0].toString() + ',' + tags[2].toString() + ',' + tags[3].toString()  + ',' + tags[Math.floor(3 + (Math.random()*6))].toString()).then(function(r) {
		//console.log(r.data.gfycats[Math.floor((Math.random() * 10))]);
		if (r.data.gfycats.length > 0){
		document.getElementById('suggested').src = r.data.gfycats[Math.floor((Math.random() * r.data.gfycats.length))].gifUrl;
	}else{
		document.getElementById('suggested').src = 'https://az853139.vo.msecnd.net/static/images/not-found.png';
	}
		document.getElementById('third').hidden = false;
	}, function(err) {
    console.log('Sorry, something is wrong: ' + err);
  });
  return tags;
}*/

function parseResponse(resp) {
	//document.getElementById('third').hidden = false;
	localStorage.setItem('data',JSON.stringify(resp));
  var tags = [];
  if (resp.status_code === 'OK') {
    var results = resp.results;
    tags = results[0].result.tag.classes;
	 //tagCloud(results[0].result.tag.classes);
  } else {
    console.log('Sorry, something is wrong.');
  }
	
	var pins = JSON.parse(localStorage.getItem('pins'));
	pins[1][pins[1].length] = tags;
	localStorage.setItem('pins',JSON.stringify(pins));
	addNode(pins[0][pins[0].length - 1], tags);
	updateTopDestination(tags);
  return tags;
}

function updateTopDestination(tags){
	if (localStorage.getItem('destination') === null){
		var destination = [0,0,0,0,0];
	}else{
		var destination = JSON.parse(localStorage.getItem('destination'));
	}
	for (var i = 0; i< citylist[0].length; i++){
		for(var j = 0; j < citylist[1][i].length; j++){
			for (var k = 0; k < tags.length; k++){
				if ((tags[k]).toLowerCase() === (citylist[1][i][j]).toLowerCase()){
					destination[i]++;
				}
			}
		}
	}
	localStorage.setItem('destination',JSON.stringify(destination));
	postTopDestination();
}



/*function generateCloud(tags3,weights){
	//console.log(tags3.length);
	var container = document.getElementById('popular');
	while (container.firstChild) {
    container.removeChild(container.firstChild);
	}
	for (i=0;i<tags3.length;i++){
		var item = document.createElement("H4");
		var text = document.createTextNode(tags3[i] + ', ');
		item.appendChild(text);
		item.style.fontSize = (8 + weights[i]) + "px";
		item.style.display = "inline";
		container.appendChild(item);
	}
}

function reset(){
	//console.log('reset');
	localStorage.setItem('popularTags','empty');
	localStorage.setItem('popularWeights','empty');
	var container = document.getElementById('popular');
	while (container.firstChild) {
    container.removeChild(container.firstChild);
	}
}

*/

function addNode(imgurl, tags){
	var pinboard = document.getElementById('pinboard');
	var item = document.createElement("DIV");
	item.className += "animated fadeIn first col-xs-12 col-sm-4 well";
	item.style.margin = "0px";
	if (localStorage.getItem('count') === null){
		localStorage.setItem('count',0);
	}
	item.id = localStorage.getItem('count') + 1;
	localStorage.setItem('count',item.id);
	item.style.border = "white 8px solid";
	item.style.height = "55vh";
	//item.width -= 8;
	var hero = document.createElement("IMG");
	hero.style.width = "100%";
	hero.style.padding = "8px";
	hero.src = imgurl;
	item.appendChild(hero);
	var title = document.createElement("H4");
		var titletext = document.createTextNode('Tags:');
	title.appendChild(titletext);
	item.appendChild(title);
	for(var i = 0; i < tags.length; i++){
		var textBox = document.createElement("H5");
		var text = document.createTextNode(tags[i] + ', ');
		textBox.appendChild(text);
		//textBox.style.fontSize = (8  + "px");
		textBox.style.display = "inline";
		item.appendChild(textBox);
	}
	
	var exitButton = document.createElement("BUTTON");
	exitButton.className += "btn col-xs-12";
	exitButton.style.margin = "8px";
	exitButton.style.marginLeft = "0px";
	exitButton.onclick = function() {remove(item.id);};
	var exitText = document.createTextNode("Unpin");
	exitButton.appendChild(exitText);
	item.appendChild(exitButton);
	pinboard.appendChild(item);
}

function remove(id){
	var pinboard = document.getElementById('pinboard');
	var children = pinboard.children;
	for (var i = 0; i < children.length; i++) {
		if (children[i].id === id){
			pinboard.removeChild(children[i]);
			var pins = JSON.parse(localStorage.getItem('pins'));
			for (var n = i+1; n < pins[1].length; n++){
				pins[1][n-1] = pins[1][n];
				pins[2][n-2] = pins[2][n];
			}
			localStorage.setItem('pins',JSON.stringify(pins));
			break;
		}
	}
}

function postTopDestination(){
	var destination = localStorage.getItem('destination');
	if (destination !== null){
		destination = JSON.parse(destination);
		if (destination !== [0,0,0,0,0]){
			var top = destination.length;
			var highest = 0;
			for (var i = 0; i< destination.length; i++){
				if(destination[i] > highest){
					top = i;
					highest = destination[i];
				}
			}
		}
	}
	if (highest !== 0){
		var item = document.getElementById('topDestination');
		item.removeChild(item.firstChild);
		var text = document.createTextNode(citylist[2][top]);
		item.appendChild(text);
	}
}

function run(imgurl) {
	
	if (localStorage.getItem('pins') === null){
		var pins = [];
		pins[0] = [];
		pins[0][0] = imgurl;
		pins[1] = [];
	}else{
		
		var pins = JSON.parse(localStorage.getItem('pins'));
		pins[0][pins.length] = imgurl;
	}
	
  if (Math.floor(Date.now() / 1000) - localStorage.getItem('tokenTimeStamp') > 86400 || localStorage.getItem('accessToken') === null) {
    getCredentials(function() {
  	postImage(imgurl);
});
  } else {
    postImage(imgurl);
  }
	
	
	localStorage.setItem('pins',JSON.stringify(pins));
	//addNode(imgurl)
}