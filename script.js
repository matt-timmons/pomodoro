var worktime = 7;
var shortbreak = 5;
var longbreak = 15;
var counter = 0;
var cycle_counter = 1; //how many times you've had a break; every third break is long.
var workswitch = 1; //determines whether to use breaktime or worktime
$(document).ready(function () {
	$('#start').click(function () {
        document.getElementById("cyclebox").innerHTML = "You are on cycle NUMBER " + cycle_counter;
		if (workswitch > 0) {
            document.getElementById("statusbox").innerHTML = "You are currently WORKING";
            
			startTimer(worktime);
		}
		else if (workswitch < 0) {
			if (cycle_counter % 3 === 0) {
                document.getElementById("statusbox").innerHTML = "You are currently TAKING A LONG BREAK";
				startTimer(longbreak);
                cycle_counter += 1;

			}
				else {
                document.getElementById("statusbox").innerHTML = "You are currently TAKING A SHORT BREAK";
				startTimer(shortbreak);
                cycle_counter += 1;

			};
		}
	});
	$('#pause').click(function () {
		clearInterval(counter);
	})
})
var startTimer = function (length) {
	var endTime = new Date();
	endTime.setMinutes(endTime.getMinutes() + length);
	startTime = new Date();
	counter = setInterval(myTimer, 1000);
	setTimeout(timesUp, length * 1000);
};

function myTimer() {
	var d = new Date();
	var timeElapsed = d - startTime;
	document.getElementById("timebox").innerHTML = msToTime(timeElapsed) + "/" + msToTime(length);
};
var timesUp = function () {
	clearInterval(counter);
	alert("Time is up!");
	workswitch = -workswitch
};

function msToTime(s) {
	// Pad to 2 or 3 digits, default is 2
	function pad(n, z) {
		z = z || 2;
		return ('00' + n).slice(-z);
	}
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;
	return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}