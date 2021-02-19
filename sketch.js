
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background, backgroundImage 
var gameOver, gameOverimg;
var PLAY =1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  backgroundImage = loadImage("jungle.jpg")
  gameOverimg = loadImage("gameOver.png")

  
  FoodGroup=new Group();
  obstacleGroup=new Group();
 score=0;
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(160,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1

  ground = createSprite(100,350,900,10);
//  ground.velocityX=-4;
//  ground.x = ground.width/2;
//  console.log(ground.x); 
  ground.visible=false;
  
  background = createSprite(100,200);
  background.addImage("background", backgroundImage)
  background.scale = 1.5
  background.x = background.width/2;
}


function draw() {
//background("white");
  drawSprites();

  background.velocityX = -4;
  if(gameState === PLAY){

    if (background.x < 0){
      background.x = background.width/2;
      }
      
       if(keyDown("space")&& monkey.y >= 250) {
         monkey.velocityY=-12;
        }
        monkey.velocityY = monkey.velocityY + 0.8
       
        if (FoodGroup.isTouching(monkey)) {
        score = score + 1;
        FoodGroup.destroyEach();
        monkey.scale = monkey.scale + 0.01;
       
        
      }
    
      spawnFood();
      spawnObstacles();
      if (obstacleGroup.isTouching(monkey)) {
        gameState = END;
        //score = score - 1;
         
        }
  }else if (gameState === END){
          monkey.visible = false;          
          background.velocityX = 0;

          obstacleGroup.destroyEach();
          FoodGroup.destroyEach();
          stroke("white");
          textSize(20);
          fill("black")
          text("GAME OVER!!!",300,10)
  }
   
  

  monkey.collide(ground);
  
  
  background.depth = monkey.depth;
  background.depth = background.depth - 1;
  
  stroke("white");
  textSize(20);
  fill("black")
  text("Score:" + score,200,50)

}

 function spawnFood() {
   if (frameCount % 80 === 0){
     var food = createSprite(600,200,10,10)
     food.addImage(bananaImage);
     food.velocityX=-4;
     food.lifetime = 100;
     food.scale=0.1;
     FoodGroup.add(food);
   }
 }

 function spawnObstacles() {
  if (frameCount % 300 === 0){
    var obstacle = createSprite(600,340,10,10)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-4;
    obstacle.lifetime = 100;
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
  }
    
}



