document.addEventListener("DOMContentLoaded", ()=> {
  console.log('JS Loaded!');

  Array.prototype.equals = function (array) {

    for (let i = 0, l=this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i]))
        return false;
      }
      else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  }

  highestLevelStorage = window.localStorage;
  console.log(highestLevelStorage);

  let playerArr = [];
  let computerArr = [];
  let gameButtons = document.getElementsByClassName('game-button');
  let gameContainer = document.getElementById('game-container');
  let level = 0;
  let turn = 1;
  let volume = true;
  let pressStart = document.getElementById('press-start');
  pressStart.classList.add('blink');
  let startButton = document.getElementById('start-button');

  let handleStart = () => {
    pressStart.classList.add('hide');
    startButton.classList.add('hide');
    setTimeout(() => {
      computerTurn();
    }, 500)
  }
  startButton.addEventListener('click', handleStart);

  function handleHighestLevel() {
    highestLevelStorage.setItem('level', level);
    console.log('handle-level');
    if ( level >= highestLevelStorage.level ) {
      highestLevelStorage.setItem('level', level);
    }
  }

  function computerTurn() {
      document.getElementById('level').innerText = `Level ${level + 1}`;
      computerArr.push(Math.floor((Math.random() * 4) + 1));
      console.log(computerArr);
      for(let i=0; i<gameButtons.length; i++) {
        gameButtons[i].removeEventListener('click', playerMove);
        gameButtons[i].removeEventListener('click', lightUp);
        gameButtons[i].removeEventListener('click', playSound);
      }
      // pressStart.classList.add('hide');
      pressStart.classList.remove('blink');
      pressStart.classList.remove('hide');
      pressStart.innerText = 'Computer Turn';
      animateSequence();
  }

  function playerTurn() {
    pressStart.innerText = 'Your Turn';
    pressStart.classList.remove('hide');
    pressStart.classList.remove('blink');
    for(let i=0; i<gameButtons.length; i++) {
      gameButtons[i].addEventListener('click', playerMove);
      gameButtons[i].addEventListener('click', lightUp);
      if(volume) {
        gameButtons[i].addEventListener('click', playSound);
      }
      // gameButtons[i].addEventListener('click', playSound);
    }
  }

  function playerMove() {
    pressStart.classList.add('hide');
    playerArr.push(parseInt(this.getAttribute('id').replace("simon", ""), 10));
    console.log(playerArr);
    if(checkPlayerTurn() === true && playerArr.length === computerArr.length) {
      playerArr = [];
      level++;
      handleHighestLevel();
      document.getElementById('highest-level').innerText = `Highest Level ${highestLevelStorage.level}`;
      setTimeout(computerTurn, 1000);
    } else if(checkPlayerTurn() === false) {
      let audio = new Audio('audio/game-over.wav');
      if(volume) {
        audio.play();
      }
      gameOver();
    }
  }

  function checkPlayerTurn() {
    let result = playerArr.equals(computerArr);
    return result;
    console.log(result);
  }

  function reset() {
    playerArr = [];
    computerArr = [];
    level = 0;
    for(let i=0; i<gameButtons.length; i++) {
      gameButtons[i].removeEventListener('click', playerMove);
      gameButtons[i].removeEventListener('click', lightUp);
      gameButtons[i].removeEventListener('click', playSound);
    }
    pressStart.classList.remove('game-over');
    pressStart.innerText = 'Press Start';
    pressStart.classList.remove('hide');
    startButton.classList.remove('hide');
    pressStart.classList.add("blink");
    document.getElementById('level').innerText = `Level ${level}`;
  }


  function animateSequence() {
    let i=0,
        interval = setInterval(toggleLights, 500);

    function toggleLights(){
        let lit = document.querySelector("#simon" + computerArr[i-1]),
            next = document.querySelector("#simon" + computerArr[i]);
  	 // console.log(lit, next);
        if (lit && lit.classList.contains("light")){
  	  	  off(lit);
  	  } else if (next){
          on(next);
  		    i++;
        } else {
            clearInterval(interval);
            setTimeout(playerTurn, 300);
        }
      }
      function on(element){
        console.log(element.id);
        if(volume) {
          playSoundCA(element);
        }
        element.classList.add("bg-" + element.classList[1]);
        element.classList.add("light");
        element.classList.add("bg-light");
      }
      function off(element){
        element.classList.remove("bg-" + element.classList[1]);
        element.classList.remove("light");
        element.classList.remove("bg-light");
      }
  }

  function press(e) {
    console.log('key press');
    e.target.classList.add('press');
    setTimeout(function(){
      e.target.classList.remove('press');
    }, 300);
  }

  function lightUp(e) {
    console.log(e.target.classList[1]);
    e.target.classList.add('bg-' + e.target.classList[1]);
    e.target.classList.add('light');
    e.target.classList.add('bg-light');
    setTimeout(function(){
      e.target.classList.remove('bg-' + e.target.classList[1]);
      e.target.classList.remove('light');
      e.target.classList.remove('bg-light');
    }, 500);
  }

  function playSound(e) {
    if(e.target.id === "simon1" && checkPlayerTurn()){
      console.log('1');
      let audio = new Audio('audio/simon1.wav');
        audio.play();
    }if(e.target.id === "simon2" && checkPlayerTurn()){
      console.log('2');
      let audio = new Audio('audio/simon2.wav');
        audio.play();
    }if(e.target.id === "simon3" && checkPlayerTurn()){
      console.log('3');
      let audio = new Audio('audio/simon3.wav');
        audio.play();
    }if(e.target.id === "simon4" && checkPlayerTurn()){
      console.log('4');
      let audio = new Audio('audio/simon4.wav');
        audio.play();
    }
  }

  function playSoundCA(element) {
    if(element.id === "simon1"){
      console.log('1');
      let audio = new Audio('audio/simon1.wav');
        audio.play();
    }if(element.id === "simon2"){
      console.log('2');
      let audio = new Audio('audio/simon2.wav');
        audio.play();
    }if(element.id === "simon3"){
      console.log('3');
      let audio = new Audio('audio/simon3.wav');
        audio.play();
    }if(element.id === "simon4"){
      console.log('4');
      let audio = new Audio('audio/simon4.wav');
        audio.play();
    }
  }

  let gameOverText = document.getElementById('game-over');

  function gameOver() {
    pressStart.innerText = 'Game Over';
    pressStart.classList.add('game-over');
    pressStart.classList.remove("blink");
    pressStart.classList.remove('hide');
    // let audio = new Audio('audio/game-over.wav');
    // if(volume) {
    //   audio.play();
    // }
    gameContainer.classList.add('shake');
    setTimeout(function(){
      gameContainer.classList.remove('shake');
      setTimeout(function(){
        pressStart.classList.add('hide');
        reset();
      }, 2000)
    }, 500);
  }

  let volumeIcon = document.getElementById('volume');

  volumeIcon.addEventListener('click', handleVolume);

  function handleVolume(e) {
    if (e.target.classList.contains('fa-volume-up')) {
      volume = false;
      e.target.classList.remove('fa-volume-up');
      e.target.classList.add('fa-volume-mute');
      for(let i=0; i<gameButtons.length; i++) {
        gameButtons[i].removeEventListener('click', playSound);
      }
    } else if (e.target.classList.contains('fa-volume-mute')) {
      volume = true;
      e.target.classList.remove('fa-volume-mute');
      e.target.classList.add('fa-volume-up');
      for(let i=0; i<gameButtons.length; i++) {
        gameButtons[i].addEventListener('click', playSound);
      }
    }
  }

});
