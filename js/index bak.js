var mainMenu = document.getElementById("main-menu");
var menu = "menu0";

//load audio
var buttonAudio = new Audio("./assets/button.wav");
var playButtonAudio = new Audio("./assets/switch.wav");
var menuBgm = new Audio("./assets/dark-forest-bgm.mp3");
menuBgm.loop = true;

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;
        
    
    var b = "!@#$%^&*?/";
        m = b.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;

        var symb = Math.random();

        if (symb < 0.15) {
            a[i] = b.charAt(Math.floor(Math.random() * m));
        }
    }
    return a.join("");
}

function changeHover(ele){
    //no change
    if (ele.id == menu) return;

    buttonAudio.currentTime = 0;
    buttonAudio.play();

    //remove old hover
    buttonLeave(document.getElementById(menu));

    //change current menu
    menu = ele.id;

    //hover new button
    buttonHover(ele);
}

function buttonHover(ele){
    ele.innerHTML = ele.value;
    ele.style.filter = "blur(0px)";
    ele.style.color = "#000000";
    
    var bg = document.getElementById(ele.id + "bg");
    bg.style.backgroundColor = "rgba(215, 100, 0, 0.7)";
}

function buttonLeave(ele){
    ele.innerHTML = ele.innerHTML.shuffle();
    ele.style.filter = "blur(2px)";
    ele.style.color = "#ffffff";

    var bg = document.getElementById(ele.id + "bg");
    bg.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
}

function play() {
    //remove listener
    document.removeEventListener('keydown',menuSelection);

    //hide menu
    mainMenu.style.display = "none";

    playButtonAudio.play();
    menuBgm.pause();
}

function menuSelection(e){
    var moved = false;
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */){
        var menuId = menu.slice(-1);
        menuId--;
        moved = true;
    }
    else if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
        var menuId = menu.slice(-1);
        menuId++;
        moved = true;
    }
    else if (e.keyCode === 13 /* enter */ || e.keyCode === 32 /* space */ || e.keyCode === 69 /* 3 */) {
        selectMenu(document.getElementById(menu));
    }

    menuId %= 3;

    if (menuId == -1) menuId = 2;

    if (moved) {
        changeHover(document.getElementById("menu" + menuId));
    }
}

function selectMenu(ele) {
    buttonAudio.currentTime = 0;

    var id = ele.id.slice(-1);

    if (id == 0) {
        play();
    } else {
        buttonAudio.play();
    }
}

function openMainMenu(){
    for (var i = 0; i < 3; i++) {
        var ele = document.getElementById("menu" + i);
        buttonLeave(ele);
    }

    //show menu
    mainMenu.style.display = "flex";

    menu = "menu0";
    var playButton = document.getElementById("menu0");
    buttonHover(playButton);
    
    document.addEventListener('keydown',menuSelection)

    menuBgm.play();
}

$(document).ready(function() {
    var movementStrength = 15;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $("#main-menu").mousemove(function(e){
              var pageX = e.pageX - ($(window).width() / 2);
              var pageY = e.pageY - ($(window).height() / 2);
              var newvalueX = width * pageX * -1 - 25;
              var newvalueY = height * pageY * -1 - 50;
              $('#main-menu').css("background-position", newvalueX+"px "+newvalueY+"px");
    });
    });

openMainMenu();