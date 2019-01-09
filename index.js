function findStat(nick){
	location.href = "entstat?"+nick;
};


$(document).ready(function(){
	$('#findUser').click(function(){
		findStat($('#inp').val());
	});
	
});