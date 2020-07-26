var monkey, monkey_run;
var bananaImage, bananag;
var banana;
var stoneg,stoneImage;
var stone;
var ground,backGround
var score;
var gameOver,restart, gameOverimg, restartimg;
var backGroundimg, backGround,ground;
var bananag, stoneg;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
 backGroundimg = loadImage("jungle.jpg");
  
monkey_run =  loadAnimation("Monkey_03.png","Monkey_02.png","Monkey_01.png","Monkey_10.png","Monkey_08.png","Monkey_09.png","Monkey_07.png","Monkey_05.png","Monkey_06.png","Monkey_04.png");
  
  //error
  bananaImage = loadImage("Banana.png");
  stoneImage = loadImage("stone.png");
  
  //error
  //IMAGE
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  
  groundimg = loadImage("ground.jpg");
}

function setup() {
  createCanvas(600,300);

  backGround = createSprite(200,180,400,20);
  //error
  backGround.addImage("ground",backGroundimg);
  backGround.x = backGround.width /2;
  
  ground= createSprite(100,240,50,50);
  ground.addImage("Ground",groundimg);
  ground.debug = true;
  ground.scale = 0.1;
  
  
  monkey= createSprite(100,170,50,50);
  //ERROR
  //monkey.addAnimation("monkey_running","monkey");
  monkey.addAnimation("monkey_running",monkey_run);
  monkey.scale = 0.1;
  
  ground = createSprite(200,190,400,10);
  ground.visible = false;
  
  bananag = new Group();
  stoneg = new Group();
  
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage("gameOver",gameOverimg);
  gameOver.scale = 0.5;
  restart.addImage("restart",restartimg);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
 
 

  score = 0;
  
}
function draw(){
 background(255);
  
  
  if(gameState === PLAY){
    
  switch(score){
    case 10: monkey.scale = 0.12;
            break;
    case 20: monkey.scale = 0.14;
            break;
    case 30: monkey.scale = 0.16;
            break;
    case 40: monkey.scale = 0.18;
            break;
     default:break;
  }
    
  if(stoneg.isTouching(monkey)){
    monkey.scale = 0.05;
    gameState = END;
  }
    
  if(bananag.isTouching(monkey)){
    monkey.scale= 0.1
     score = score + 1;
    
  }
  if (ground.x < 0){
     ground.x = ground.width/2
  }
    spawnbanana();
    spawnstone();
    
  }
    
  else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    backGround.velocityX = 0;
    stoneg.setVelocityXEach(0);
    bananag.setVelocityXEach(0);
    
    stoneg.setLifetimeEach(-1);
    bananag.setLifetimeEach(-1);
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
  }

 text("score "+ score,500,50);
  textSize(20);
  stroke("white");
  fill("white");
  
  if(keyDown("space")&& monkey.y >= 170){
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
   monkey.collide(ground);
  
 drawSprites();
}


function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  monkey.scale = 0.1;
  
  bananag.destroyEach();
  stoneg.destroyEach();
  
  score = 0;
  
}
function spawnbanana() {

  if(frameCount % 60 === 0) {
    banana = createSprite(600,90,10,40);
    banana.velocityX = -(6 + 3*score/100);
  
    banana.scale = 0.05;
    banana.lifetime = 300;
    
    banana.addAnimation("banana",bananaImage);
   
    bananag.add(banana);
  }
}
function spawnstone() {
  if(frameCount % 60 === 0) {
    stone = createSprite(600,185,10,40);
    stone.velocityX = -(6 + 3*score/100);
             
    stone.scale = 0.1;
    stone.lifetime = 300;
    stone.addAnimation("stone",stoneImage);
 
    stoneg.add(stone);
  }
}
  
