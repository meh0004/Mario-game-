var backgroundImg, marioImg, ObstacleImg;
var back,ground;
var mario, mariodie;
var obstacle, obstacleGroup;
var brick, brickImg, brickGroup;
var gameState = "PLAY"

function preload(){
backgroundImg = loadImage("bg.png");
marioImg = loadAnimation("mario00.png","mario02.png", "mario03.png");
ObstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
brickImg = loadImage("brick.png");
mariodie = loadAnimation("collided.png");
}

function setup(){
createCanvas(800,400);
imageMode(CENTER);

back = createSprite(600,200);
backgroundImg.resize(1600,400);
back.addImage(backgroundImg);
back.velocityX = -4;

ground = createSprite(100,350,100,10);
ground.visible = false;

mario = createSprite(100,305);
mario.addAnimation("running",marioImg);
mario.addAnimation("die",mariodie);
mario.scale = 2;

obstacleGroup = new Group();
brickGroup = new Group();

}

function draw(){
  if(gameState === "PLAY"){
    if(back.x < 0){
        back.x = back.width/2
    }
    mario.addAnimation("running",marioImg);
   if(keyDown("space")&& mario.y > 300){
       mario.velocityY = -13;
   }
   mario.velocityY = mario.velocityY + 0.5;
   mario.collide(ground);

   if(mario.isTouching(brickGroup)){
       brickGroup.destroyEach();
   }
   if(mario.isTouching(obstacleGroup) ){
       gameState = "END";
   }
    Obstacles();
    Bricks();
    drawSprites();
}


if(gameState === "END");
 back.velocityX = 0;
 brickGroup.setVelocityXEach(0);
 obstacleGroup.setVelocityXEach(0);
 brickGroup.setLifetimeEach(-1);
 obstacleGroup.setLifetimeEach(-1);
 mario.changeAnimation("die",mariodie);
 }


function Obstacles(){
    if(frameCount % 200 === 0 ){
        obstacle = createSprite(800,320);
        obstacle.addAnimation("obstacles",ObstacleImg);
        obstacle.velocityX = -4;
        obstacle.lifetime = 400;
        obstacleGroup.add(obstacle);
    }
}

function Bricks(){
    if(frameCount % 250 === 0 ){
        var randY = Math.round(random(150,250));
        brick = createSprite(800,randY);
        brick.addImage(brickImg);
        brick.velocityX = -4;
        brick.lifetime = 400;
        brickGroup.add(brick);
    }

}