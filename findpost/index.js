moment.locale('ko');
function colorByRole(role){
	if(role=="member"){
		return "green";
	}
	if(role=="teacher"){
		return "teal";
	}
	if(role=="admin"){
		return "blue";
	}
};
function newPost(title, content, username, created, target){
	ents.getProfileImage(username)
	.then(function(d){
		return ents.getUserByUsername(username)
		.then(function(dd){return {p:d,i:dd}})
	})
	.then(function(d){
		$(target).html($(
			`
			<div class="ui left aligned raised segment" width="500px">
			<div class="ui accordion">
			<div class="title">
			<div class="ui large header">${title}</div>
			<div class="ui grid">
			<div class="eight wide column">
			<a class="ui ${colorByRole(d.i.role)} large image label user">
			${d.p}
			${username}
			<div class="detail">${d.i.description}</div>
			</a>
			</div>
			<div class="eight wide right aligned column">
			<div class="ui large basic label">
			${moment(created).format('LLL')}
			</div>
			</div>
			</div>
			</div>
			<div class="content">
			<div class="ui divider"></div>
			<p>
			${content}
			</p>
			</div>
			</div>
			</div>
			<script>
			$('.ui.accordion').accordion();
			$('${target} > div').transition('drop in');
			</script>`
			));
	});
};
function postView(ID, target){
	return ents.getPostByID(ID)
	.then(function(d){
		return newPost(d.title,d.content.replace(/(\n|\r\n)/g, '<br>'),d.owner,d.created, target);
	});
};
function viewByArray(arr){
	for(var i=0;i<arr.length;i++){
		postView(arr[i]._id, "#postRow"+(i+1));
	};
	if(arr.length<20){
		for(var i=0;i<20-arr.length;i++){
			$("#postRow"+(arr.length+i+1)).attr('style','display:none;');
		};
	};
};
function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
function getQuery(){
	if(isJson(decodeURI(location.search.substring(1)))){
		return JSON.parse(decodeURI(location.search.substring(1)));
	}else{
		if(decodeURI(location.search.substring(1))){
			return {q:decodeURI(location.search.substring(1))};
		}else{
			return {};
		};
	}
};
$(document).ready(function(){
	ents.getPostListByDate(getQuery().category, getQuery().q, getQuery().date1,getQuery().date2)
	.then(function(d){
		if(getQuery().page){
			viewByArray(d.data.slice(20*getQuery().page-20,20*getQuery().page));
		}else{
			viewByArray(d.data.slice(0,20));
		};
	});
	$(window).scroll(function () {
		if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
			console.log('window scroll End!!');                
		};
	});
});



