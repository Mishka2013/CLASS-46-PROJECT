var  soldier;
//var ground;
var bgImg;
var bg;
var soldier_running, enemy1,bomb1


var bullet;
var fire;
var gun;
var score;
var button;

var reset;

var PLAY =1
var END = 0;
var gameState = PLAY;

function preload(){
bgImg = loadImage("finalbg.jpg");
soldier_running = loadAnimation("soldier_1.png", "soldier_2.png","soldier_3.png","soldier_4.png","soldier_5.png","soldier_6.png")
rope = loadImage("rope5.png");
enemy1 = loadImage("terr.png");
bomb1 = loadImage("bomb.png");
start1 = loadImage("start.png");
gameOver1 = loadImage("gameOver.png");
bullet1 = loadImage("bullet.png");
fire1 = loadImage("button.png")
gun1 = loadImage("gun.png");



}

function setup(){
var canvas = createCanvas(windowWidth,windowHeight);
soldier = createSprite(windowWidth/2-400, windowHeight/2+70);
//fire = createSprite(windowWidth/2+600, windowHeight/2-200);
//fire.addImage(fire1);
//fire.scale = 0.1;

button = createButton("Fire");
button.position(width-70, height/6);

bulletGroup =  new Group;
enemyGroup = new Group;
bombGroup = new Group;


score = 0;

 ground = createSprite(width/2,height/2+70,width,10);
 ground.addImage(rope);
var invisibleGround = createSprite(width/2,height/2+65,width,10);
//invisibleGround.visible = false;
ground.velocityX = -3;

//bg = createSprite(0,0,width,height);
//bg.velocityX = -10;
//bg.addImage(bgImg);
soldier.addAnimation("running", soldier_running);
soldier.scale = 0.7;

gameOver = createSprite(width/2-400, height/2);
gameOver.addImage(gameOver1);
gameOver.scale = 0.3;

start = createSprite(width/2-200,height/2);
start.addImage(start1);
start.scale = 0.1;

start.visible = false;
gameOver.visible = false;


} 

function draw(){
background(bgImg);
textSize(30);
text("Score:"+ score,windowWidth/2+400, windowHeight/2-200);

if(gameState===PLAY){
  if(keyDown("space")) {
    soldier.velocityY = -12;
  }
  soldier.velocityY = soldier.velocityY + 0.8
  soldier.collide(ground);

  if(enemyGroup.isTouching(bulletGroup)) {
    score = score+1;
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
     }

     if(soldier.isTouching(bombGroup)|| soldier.isTouching(enemyGroup)){
       gameSatate = END;
     }

     spawnBomb();
  spawnEnemey();

  button.mousePressed(()=>{
    bullet = createSprite(soldier.x,soldier.y);
    bullet.addImage(bullet1);
    bullet.scale = 0.3;
    bullet.velocityX = 4;
    bulletGroup.add(bullet);
      })
}

else if (gameState===END ){
soldier.visible = false;
bombGroup.destroyEach();
enemyGroup.destroyEach();

start.visible = true;
gameOver.visible = true;

reset();

}


//if(soldier.isTouching(bombGroup)){
//reset = createSprite(width/2)
//}




if (ground.x <ground.width/2-200){
    ground.x =ground.width/2;
 }

 

 

 

  //bg.depth = soldier.depth;
  //soldier.depth = soldier.depth+1;

  

  
  
drawSprites();

}



    function createBullet(){
   bullet = createSprite(soldier.x,soldier.y);
  bullet.addImage(bullet1);
  bullet.scale = 0.3;
  bullet.velocityX = 4;
  bulletGroup.add(bullet);
    }

function spawnBomb(){
  if(frameCount%500===0){
    var bomb = createSprite(windowWidth/2+400, windowHeight/2);
    bomb.addImage(bomb1);
    bomb.scale = 0.5
    //bomb.lifetime = windowWidth;
    bomb.velocityX = -2;
    bombGroup.add(bomb);
  }

}

function spawnEnemey(){
  if(frameCount%300===0){
  var enemy = createSprite(windowWidth/2+400, windowHeight/2);
enemy.addImage(enemy1);
enemy.scale = 1;
enemy.lifetime = 300
enemy.velocityX = -2;
enemyGroup.add(enemy)
   }
}

function reset(){
 if(mousePressedOver(start)){
gameState = PLAY;

 }
}

