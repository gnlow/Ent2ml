var ents = {
	getProjectTotal:{views:{},likes:{},comments:{}}
};
ents.nick = location.search.substring(1);
ents.get = function(url){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(d){resolve(d);}
		});
	});
};
ents.getUserByUsername = function(username){
	return ents.get("https://playentry.org/api/getUserByUsername/"+username
		);
};
ents.getProjectByUserID = function(userID){
	return ents.get("https://playentry.org/api/project/find?option=list&sort=updated&rows=0&type=project&user="+userID
		);
};
ents.getProjectByUsername = function(username){
	return ents.getUserByUsername(username)
	.then(function(d){
		return ents.getProjectByUserID(d._id);
	});
};
ents.getProjectTotal.ByDataAndKey = function(d, key){
	var sum = 0;
	for(var i=0;i<d.data.length;i++){
		sum = sum + d.data[i][key];
	}
	return sum;
};
ents.getProjectTotal.views.ByData = function(d){
	return ents.getProjectTotal.ByDataAndKey(d, "visit");
};
ents.getProjectTotal.likes.ByData = function(d){
	return ents.getProjectTotal.ByDataAndKey(d, "likeCnt");
};
ents.getProjectTotal.comments.ByData = function(d){
	return ents.getProjectTotal.ByDataAndKey(d, "comment");
};
ents.getProjectTotal.views.ByUserID = function(userID){
	return ents.getProjectByUserID(userID)
	.then(ents.getProjectTotal.views.ByData);
};
ents.getProjectTotal.views.ByUsername = function(username){
	return ents.getProjectByUsername(username)
	.then(ents.getProjectTotal.views.ByData);
};
ents.getProjectTotal.likes.ByUserID = function(userID){
	return ents.getProjectByUserID(userID)
	.then(ents.getProjectTotal.likes.ByData);
};
ents.getProjectTotal.likes.ByUsername = function(username){
	return ents.getProjectByUsername(username)
	.then(ents.getProjectTotal.likes.ByData);
};
ents.getProjectTotal.comments.ByUserID = function(userID){
	return ents.getProjectByUserID(userID)
	.then(ents.getProjectTotal.comments.ByData);
};
ents.getProjectTotal.comments.ByUsername = function(username){
	return ents.getProjectByUsername(username)
	.then(ents.getProjectTotal.comments.ByData);
};
ents.getProfileImage = function(username){
	return ents.getUserByUsername(username)
	.then(function(d){
		return `<img alt="User profile" src="https://playentry.org/uploads/profile/${
			d._id.substring(0,2)}/${d._id.substring(2,4)}/avatar_${d._id}.png" onerror="this.src='https://playentry.org/img/assets/avatar_img.png'" id="prof">`
		});
};
ents.getPostByID = function(ID){
	return ents.get("https://playentry.org/api/discuss/"+ID);
};
ents.getPostList = function(category="free",title){
	if(title){
		return ents.get(`https://playentry.org/api/discuss/find?category=${category}&title=${title}&sort=created&rows=0`);
	}else{
		return ents.get(`https://playentry.org/api/discuss/find?category=${category}&sort=created&rows=20`);
	}
};
ents.getPostListByDate = function(category, title, date1, date2){
	return ents.getPostList(category, title)
	.then(function(d){
		if(date1&&date2){
		return {data : d.data.filter(obj=>moment(obj.created).isBetween(date1,date2)),
			skip : d.skip,
			count : d.count};
		}else{
			return d;
		};
	});
};