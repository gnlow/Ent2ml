$(document).ready(function(){

	ents.getUserByUsername(ents.nick)
	.then(function(d){
		$('#profLabel').html('<img src="'+"https://playentry.org/uploads/profile/"+
			d._id.substring(0,2)+"/"+d._id.substring(2,4)+"/avatar_"+d._id+".png"+'" onerror="'+"this.src='"+'https://playentry.org/img/assets/avatar_img.png'+"'"+'" id="prof">'+ents.nick);
	});
	ents.getProjectTotal.views.ByUsername(ents.nick)
	.then(function(d){
		$('#views').text(d);
	});
	ents.getProjectTotal.likes.ByUsername(ents.nick)
	.then(function(d){
		$('#likes').text(d);
	});
	ents.getProjectTotal.comments.ByUsername(ents.nick)
	.then(function(d){
		$('#comments').text(d);
	});
});