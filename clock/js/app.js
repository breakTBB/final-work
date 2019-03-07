$(function() {
	setInterval(function() {
		var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var dt = new Date();
		var time = dt.getHours() + ":" + dt.getMinutes() + "";

		$('.date').html(""+months[dt.getMonth()]+" "+dt.getDate()+", "+dt.getFullYear()+"");

		var hours = dt.getHours() < 12 ? dt.getHours() : dt.getHours() - 12;
		var am = dt.getHours() < 12 ? "AM" : "PM";

		var minutes = ""+dt.getMinutes()+"";
		if (minutes < 10) {
			minutes = "0"+minutes+"";
		}
		$('.time').html(""+hours+":"+minutes+" "+am+"");
		$('.seconds').html(""+dt.getSeconds()+"s")
	}, 1000);
});
