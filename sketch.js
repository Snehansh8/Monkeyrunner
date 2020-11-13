//adding variables for sprites

  var monkey , monkey_running, monkeyCollide;
  var ground, invisiGround, groundImg;
  var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, obstacleGroup;
  var score = 0;
  var bananaScore = 0;
  var PLAY = 0;
  var END = 1;
  var gameState = PLAY;

function preload(){
  
  //loading the animations for the monkey
  monkey_running =
    loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  //loading animation for when monkey collides
  monkeyCollide = loadAnimation("monkey_1.png");
  
  //adding image of ground 
  groundImg = loadAnimation("ground.jpg") 
  
  //loading images for bananas and rocks (obstacles)
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  //creating groups for bananas and obstacles
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  //creating the monkey
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  //adding the ground
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  //adding the animation for the ground
  ground.addAnimation("ground", groundImg);
  
  //adding the invisible ground to make the monkey stand on
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
}

function draw(){
  
  //adding background and text
  background("blue");
  fill("yellow");
  textSize(16);
  text("SCORE: "+score, 100, 20);
  textSize(16);
  text("BANANAS EATEN: "+bananaScore,400,20);
  
  //adding gamestates code
  if (gameState === PLAY){
    
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("yellow")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("orange");
    textSize(20);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  //making the sprites appear
  drawSprites(); 
  
  //making the monkey stand on the invisible ground
  monkey.collide(invisiGround);
}

//making bananas appear
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

//making obstacles appear
function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






