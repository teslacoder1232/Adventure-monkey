var ground,groundImage;
var jungle,jungleImage;
var monkey, monkey_running;
var FoodGroup,bananaImage;
var obstacleGroup, obstacleImage;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  jungleImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
}

function setup() {
  createCanvas(700,400);
  
  jungle=createSprite(0,0,700,400);
  jungle.addImage(jungleImage);
  jungle.scale=1.5;
  jungle.velocityX=-6;
  
  ground = createSprite(0,400,700,10);
  ground.velocityX=-6;
  ground.visible=false;
  
  
  monkey = createSprite(100,360,0,0);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.11;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  
  if(gameState===PLAY){
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  ground.velocityX=-(4 + 2*score/100); 
  
  if(jungle.x<100){
    jungle.x=jungle.width/2;
  }
   jungle.velocityX=-(4 + 2*score/100);
  
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.9;
                break;
        case 20: monkey.scale=0.15;
                break;
        case 30: monkey.scale=0.19;
                break;
        case 40: monkey.scale=0.21;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnfood();
    spawnobstacle();  
 
    if(obstacleGroup.isTouching(monkey)){ 
        gameState = END;
    }
  }else if(gameState === END){
    textSize(30);
    fill(255);
    text("Game Over!", 350,200);
    monkey.visible = false;
    
     ground.velocityX = 0;
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    
    FoodGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach( 0);
    obstacleGroup.setLifetimeEach(-1);
  }
}

function spawnfood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,0);    
    banana.addImage(bananaImage);
    banana.y = random(120,200);
    banana.scale = 0.08;
    banana.velocityX=-(6 + 2*score/100); 
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }
}

function spawnobstacle() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(690,350);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(5 + 2*score/100);   
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}