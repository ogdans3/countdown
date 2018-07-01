function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    console.log(Date.parse(endtime), Date.parse(new Date()))
    console.log(t);
    var seconds = Math.floor( (t/1000) % 60 ) + "";
    var minutes = Math.floor( (t/1000/60) % 60 ) + "";
    var hours = Math.floor( (t/(1000*60*60)) % 24 ) + "";
    var days = Math.floor( t/(1000*60*60*24) ) + "";

    var time = {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
    for(var i = 0; i < Object.keys(time).length; i++) {
        var key = Object.keys(time)[i];
        var value = time[key];
        console.log(value.length);
        if(value.length == 1) {
            time[key] = "0" + value;
        }
    }
    return time;
}

function updateClock(){
    var endtime = '31/12/2019';
    var endtime = 'December 31 2019 10:59:59 GMT+0200';
    var t = getTimeRemaining(endtime);
    var days = document.getElementById("days");
    var hours = document.getElementById("hours");
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");
    days.innerHTML = t.days;
    hours.innerHTML = t.hours;
    minutes.innerHTML = t.minutes;
    seconds.innerHTML = t.seconds;

    if(t.total<=0){
        clearInterval(timeinterval);
    }
}

console.log("Here");
updateClock(); // run function once at first to avoid delay
var timeinterval = setInterval(updateClock,1000);