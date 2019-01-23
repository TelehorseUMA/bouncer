var canvas = document.getElementById('canv')
ctx = canvas.getContext('2d')
var tileSize = 100

/************************ GAME BOARD *************************/
//  1.  simple map for test purposese

gameBoard = [
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
]

function drawBoard(twoDimArray) {
  for (i = 0; i < twoDimArray.length; i++) {
    for (j = 0; j <= twoDimArray[0].length; j++) {
      ctx.strokeRect(j*tileSize, i*tileSize, tileSize, tileSize)
    }
  }
}

drawBoard(gameBoard)

//  2.  write create map function that will create maps according to pre-defined rules and inputs to generate different levels
//      =>  the gameBoard is always conceptualized in terms of a 2d array; indeces are mapped to the canvas by the drawBoard function
//      =>  player and NPC positions are also given as indeces and mapped onto the canvas by respective functions

/************************ CHARS *************************/

//  PLAYER

var player = new Bouncer(2, 1, {
  front:  '../imgs/bouncer_front.png',
  left:   '../imgs/bouncer_left.png',
  right: '../imgs/bouncer_right.png',
},tileSize)

//  NPCs  
var guestArray = []
var punkgirl = new Guest(0, 0, '../imgs/guest_punkgirl.png', true)
guestArray.push(punkgirl)
var gayguy = new Guest(0, 0, '../imgs/guest_gayguy.png', true)
guestArray.push(gayguy)
var businessman = new Guest(0, 0, '../imgs/guest_businessman.png',false)
guestArray.push(businessman)

//  EMPTY LINE ELEMENT
var empty = ''
guestArray.push(empty)

/************************ LINES *************************/
var regLine = new Line(5, 5000, 3, 3000, 20, 6000, 1, [], 1, 'reg', true)

regLine.update()

/************************ DRAWING *************************/

/*
drawPlayer(player) {

}
*/

/*
drawNPCs() {

}
*/


/************************ STATS *************************/

//  * rep < 0 => you lose; rep below a certain treshhold => more undesirables turn up 
//  * initial rep val lowered to increase difficulty in higher levels
//  * rep and cash objectives will be set per level; if you don't reach them by the end of the            night you lose
//  * length of the night can be varied to increase difficulty
//  * create function to set stats so different levels can be created quicker

var stats = {
  score: 0,
  reputation: 100,
  cash: 0,
  time: 0, // 0 = 11pm; end of party might vary to increase difficulty
}

/************************ MOVEMENT *************************/

document.onkeydown = function(e) {
  e.preventDefault()
  switch(e.keyCode) {
    case 37:  //  keydown keycode left cursor
    player.moveLeft()
    map.drawEverything(ctx)
    break
    case 39:  // keydown keycode right cursor
    player.moveRight()
    map.drawEverything(ctx)
    break 
  }
}
document.onkeyup = function(e) {
  e.preventDefault()
  switch(e.keyCode) {
    case 37:
    player.view = 'front'  // switch back to img bouncer front
    map.drawEverything(ctx)
    break
    case 39:
    player.view = 'front'  // switch back to img bouncer front
    map.drawEverything(ctx)
    break
  }
}

/************************ GAME CONTROL *************************/

//  * initialize the game
//  * trigger events: player winning / player losing 


/************************ ANIMATION *************************/

var map = new Map(100, 5, 7)

function animation() {
  map.update()
  map.drawEverything(ctx)
  window.requestAnimationFrame(animation)
}
animation()