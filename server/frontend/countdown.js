var timeinterval = null;

function getTimeRemaining(endtime){
    var t = new Date(endtime * 1000) - new Date();
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
        if(value.length == 1) {
            time[key] = "0" + value;
        }
    }
    return time;
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function initialUpdate() {
    if(countdown === null || countdown === undefined || countdown.epoch === null || countdown.epoch === undefined) {
        getJSON(window.location.pathname, function(json) {
            countdown = JSON.parse(json);
            initialUpdate();
        })
        return;
    }
    updateTitle();
    updateDescription();
    updateClock();
    timeinterval = setInterval(updateClock,1000);
}

function updateTitle() {
    var title = document.getElementById("title");
    title.innerHTML = countdown.title;
}

function updateDescription() {
    var description = document.getElementById("description");
    description.innerHTML = countdown.description;
}

function updateClock(){
    var endtime = countdown.epoch;
    var t = getTimeRemaining(endtime);
    if(t.total < 0){
        clearInterval(timeinterval);
        t.days = "00";
        t.hours = "00";
        t.minutes = "00";
        t.seconds = "00";
    }
    var days = document.getElementById("days");
    var hours = document.getElementById("hours");
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");
    days.innerHTML = t.days;
    hours.innerHTML = t.hours;
    minutes.innerHTML = t.minutes;
    seconds.innerHTML = t.seconds;
}


