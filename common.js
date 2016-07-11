var initY, mousePressX, mousePressY, flag;

var range = document.getElementById('range');
var dropsArray = document.querySelectorAll('.rain > div');


range.addEventListener('mousedown', function (event) {
    initY = this.offsetTop;
    setPosition(dropsArray);
    mousePressX = event.clientX;
    mousePressY = event.clientY;
    if (this.offsetTop < 80) {
        document.querySelector(".rain").style.display = "none";
    }
    document.querySelector(".rain").style.display = "block";
    this.addEventListener('mousemove', repositionElement, false);
}, false);


document.addEventListener('mouseup', function () {
    console.log(range.offsetTop);
    if (range.offsetTop < 1) {
        document.querySelector(".rain").style.display = "none";
    } else {
        setTimeout(function () {
            document.querySelector(".rain").style.display = "none";
        }, 5000);
    }

    range.removeEventListener('mousemove', repositionElement, false);
}, false);


function repositionElement(event) {
    this.style.top = this.style.top || 0;

    if (parseInt(this.style.top) <= 178 && parseInt(this.style.top) >= 0) {
        this.style.top = initY + event.clientY - mousePressY + 'px';
    }
    if (parseInt(this.style.top) > 178) {
        this.style.top = "178px"
    }
    if (parseInt(this.style.top) >= 88 && parseInt(this.style.top) <= 92) {
        document.querySelector("#flash").className = "flash active";
        setTimeout(function () {
            document.querySelector("#flash").className = "flash";
        }, 500)
    }
    if (parseInt(this.style.top) == 0) {
        document.querySelector('#text').className = "text"
    }
    if (parseInt(this.style.top) > 0 && parseInt(this.style.top) < 80) {
        document.querySelector('#text').className = "text text-1"
    }
    if (parseInt(this.style.top) > 80 && parseInt(this.style.top) < 100) {
        document.querySelector('#text').className = "text text-2"
    }
    if (parseInt(this.style.top) > 120 && parseInt(this.style.top) < 178) {
        document.querySelector('#text').className = "text text-3"
    }
    if (parseInt(this.style.top) < 80) {
        flag = 1;
    } else {
        flag = 0;
    }
    if (flag) {
        document.querySelector(".rain").style.display = "block";
    } else {
        document.querySelector(".rain").style.display = "none";
    }
    if (parseInt(this.style.top) < 0) {
        this.style.top = 0
    }
    if (parseInt(this.style.top) >= 176) {
        document.getElementById('card-holder').style.display = "block";
        document.getElementById("card-flash").className = "card-flash active"
    } else {
        document.getElementById("card-flash").className = "card-flash";
        document.getElementById('card-holder').style.display = "none";
    }
    if (parseInt(this.style.top) == 0) {
        toggleVideo();
    } else {
        toggleVideo('hide');
    }
    document.getElementById("sprite").style.backgroundPosition = "0px " + Math.round(-parseInt(this.style.top) / 3) * 221 + "px";
}


function randomPosition(min, max) {
    var num = Math.random() * (max - min) + min;
    return Math.floor(num);
}
function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }

    var classString = element.className, nameIndex = classString.indexOf(className);
    if (nameIndex == -1) {
        classString += ' ' + className;
    }
    else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

function setPosition(arr) {
    setInterval(function () {
        toggleClass(arr[randomPosition(0, arr.length)], " rain-animation");
    }, 100);

    for (var i = 0; i < arr.length; i++) {
        arr[i].style.top = randomPosition(0, 221) + "px";
        arr[i].style.left = randomPosition(0, 490) + "px";
    }

}

function toggleVideo(state) {
    var div = document.getElementById("frame");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    div.style.display = state == 'hide' ? 'none' : '';
    func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
}


