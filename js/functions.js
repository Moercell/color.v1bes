//test//
///// Generate random color //////
  function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 22)];
      }
      return color;
    }

///// loop the color-function /////
  (function ColorLoop (i) {
       setTimeout(function () {
          var colormix = getRandomColor();
          canvasCtx.fillStyle = colormix
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          var colorLegnth = colormix.length;
          if (colorLegnth < 8) {
            var bar = tinycolor(colormix).spin(180).brighten(20).saturate(50).toString();
            canvasCtx.strokeStyle = bar;
          }
          if (state == true) {
            return;
          }
          ColorLoop(i);
      }, 100);
  })(1);
// TODO: Transition effect ??


///// Pause button /////
var state = false;  // playe or pause state
function pause(){
  audio.pause();
  $('#pause').css('display','none');
  $('#play').css('display','block');
  state = true;
}
//
///// Play button /////
function play(){
  audio.play();
  $('#play').css('display','none');
  $('#pause').css('display','block');
  state = false;
  // starte the loop again!
  (function ColorLoop (i) {
       setTimeout(function () {
          var colormix = getRandomColor();
          canvasCtx.fillStyle = colormix;
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          var colorLegnth = colormix.length;
          if (colorLegnth < 8) {
            var bar = tinycolor(colormix).spin(180).brighten(20).saturate(50).toString();
            canvasCtx.strokeStyle = bar;
          }
          if (state == true) {
            return;
          }
          ColorLoop(i);
      }, 100);
  })(1);
}


///// audio Visualizer /////
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  let audio = new Audio(),
      canvas = document.getElementById('c'),
      canvasCtx = canvas.getContext('2d'),
      audioCtx = new AudioContext(),
      analyser = audioCtx.createAnalyser(),
      fftSize = analyser.fftSize,
      fbc = new Uint8Array(fftSize),
      source;

  const HEIGHT = canvas.height = window.innerHeight,
        WIDTH = canvas.width = window.innerWidth,
        RADIUS = 80,
        POINTS = 180,
        CENTER = {
          x: WIDTH/2,
          y: HEIGHT/2
        };


///// Linke the src for music /////
  audio.src = '../stars1.mp3';
  var song = 1;
  function next() { // switch to next song
      song ++;
      audio.src = '../stars' + song + '.mp3';
  }
  // TODO: loop the songlist

  audio.type = "audio/mpeg";
  audio.crossOrigin = "anonymous";
  audio.preload = "preload";
  audio.autoplay = "autoplay";

///// Volume controle /////
    var vol = 0.4;
    audio.volume = vol;
    function volume(x) {
      if (x == "up") {
        vol += 0.1;
        vol = Math.round( vol * 10 ) / 10;
        if (vol >= 1) {
          vol = 1;
        }
        audio.volume = vol;
        console.log(vol);
      }
      if (x == "down") {
        vol -= 0.1;
        vol = Math.round( vol * 10 ) / 10;
        if (vol <= 0) {
          vol = 0;
        }
        audio.volume = vol;
        console.log(vol);
      }
    }
// TODO: not supportet in safari

//// Math Variables ////
var funk1 = Math.sin;
var funk2 = Math.cos;
var funk3 = Math.sin;
var funk4 = Math.cos;

var val1 = 2;
var val2 = 2;
var val3 = 2;
var val4 = 2;

//// change values function ////

function change() {
  funk1 = document.getElementById('funk1').value;
    if (funk1 == "Math.sin") {
      funk1 = Math.sin
    }
    if (funk1 == "Math.cos") {
      funk1 = Math.cos
    }
    if (funk1 == "Math.tan") {
      funk1 = Math.tan
    }

  funk2 = document.getElementById('funk2').value;
    if (funk2 == "Math.sin") {
      funk2 = Math.sin
    }
    if (funk2 == "Math.cos") {
      funk2 = Math.cos
    }
    if (funk2 == "Math.tan") {
      funk2 = Math.tan
    }

  funk3 = document.getElementById('funk3').value;
    if (funk3 == "Math.sin") {
      funk3 = Math.sin
    }
    if (funk3 == "Math.cos") {
      funk3 = Math.cos
    }
    if (funk3 == "Math.tan") {
      funk3 = Math.tan
    }

  funk4 = document.getElementById('funk4').value;
    if (funk4 == "Math.sin") {
      funk4 = Math.sin
    }
    if (funk4 == "Math.cos") {
      funk4 = Math.cos
    }
    if (funk4 == "Math.tan") {
      funk4 = Math.tan
    }

  val1 = document.getElementById('val1').value;
  val2 = document.getElementById('val2').value;
  val3 = document.getElementById('val3').value;
  val4 = document.getElementById('val4').value;

}

var radi = 80;
var poin = 180;
function changeRad() {
  radi = document.getElementById('rad').value;
  poin = document.getElementById('points').value;
}


///// draw the thing! /////
  source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(fbc);

    for(let i = 0; i < POINTS; i++) {
      let rel = ~~(i * (POINTS/fftSize)),
          x = CENTER.x + radi * funk1 ( (i * val1 * Math.PI) / poin ),
          y = CENTER.y + radi * -funk2( (i * val2 * Math.PI) / poin ),
          x_2 = CENTER.x + (fbc[rel]) * funk3( (i * val3 * Math.PI) / poin ),
          y_2 = CENTER.y + (fbc[rel]) * -funk4( (i * val4 * Math.PI) / poin );
          // TODO:  Editibal math functions for more effects
          // TODO:  random values for more patterns

      canvasCtx.beginPath();
      canvasCtx.moveTo(x, y);
      canvasCtx.lineTo(x_2, y_2);
      canvasCtx.lineWidth = 4; // Width of the lines
      //canvasCtx.strokeStyle = "hsl(" + i + ", 100%, 100%)"; // rainbow effect
      //canvasCtx.strokeStyle = "rgb(255, "+i+", 0)"; // mix two colors
      canvasCtx.arc(x,y,10,0,2*Math.PI); // bigger Circle and others
      canvasCtx.stroke();
    }
  }

draw();


(function(){
  $('#open').bind('click', function() {
    $('.settings-wrapper').css('right', 'calc(100% - 20px)');
    $('#open').css('display', 'none');
    $('#close').css('display', 'block')
  });
})();

(function(){
  $('#close').bind('click', function() {
    $('.settings-wrapper').css('right', '30px');
    $('#open').css('display', 'block');
    $('#close').css('display', 'none')
  });
})();
