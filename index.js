function findStat(nick){
	location.href = "entstat?"+nick;
};
function findPost(inp){
	location.href = "findpost?"+inp;
};

$(document).ready(function(){
	$('#findUser').click(function(){
		findStat($('#inp').val());
	});
	
	$('#findPostComp').click(function(){
		findPost(JSON.stringify({q:$('#inp').val(), date1:$('#date1').val(), date2:$('#date2').val()}));
	});
	
	$('#findPost').popup({
		popup:$('#findPostPopup'),
		on:'click'
	});
});