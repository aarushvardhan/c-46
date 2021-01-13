var PLAY= 1;
var START= 2;
var END= 3;
var PLAY = 2;
var END = 3;
var gameState = START;
var start, startImage;
var end, endImage;
var track1, track2, track3, track4, track5, track6, trackGp;
var player, playerAnimation; 
var rail1,rail2,rail3,railGroup;
var bombs,bombImage,bobmbRand,bombGp;
var energyDrink,energyRand,energyImage,energyGp;
var coins,coinsRand,coinsImage,coinsGp
var sound;
var score;

function preload(){
  playerAnimation=loadAnimation("sprite1.png","sprite2.png","sprite3.png","sprite4.png","sprite5.png");
  
  startImage = loadImage("subway-surfers.jpg");
  endImage= loadImage("game-over-  1.jpeg");
  bombImage= loadImage("bomb.png");
  energyImage= loadImage("energyDrink.png");
  coinImage= loadImage("coin.png");
  sound= loadSound("sound.mp3");
}

function setup(){
  createCanvas(600,600);
  
  
  player = createSprite(300,500,20,20);
  player.addAnimation("player", playerAnimation);
  player.visible = false;
  
  track1 = createSprite(50, -550, 10, 1200);
  track2 = createSprite(150, -550, 10,1200);
  track3 = createSprite(250, -550, 10, 1200);
  track4 = createSprite(350, -550, 10, 1200);
  track5 = createSprite(450, -550, 10, 1200);
  track6 = createSprite(550, -550, 10, 1200);
   
  coinRand = Math.round(random(1,3));
  energyRand = Math.round(random(1,3));
  bombRand = Math.round(random(1,3));
  
  track1.shapeColor = "black";
  track2.shapeColor = "black";
  track3.shapeColor = "black";
  track4.shapeColor = "black";
  track5.shapeColor = "black";
  track6.shapeColor = "black";
   
  start = createSprite(400,290,30,30)
  start.addImage("start", startImage);
  start.scale = 0.79;
  
  end = createSprite(300,300,20,20);
  end.addImage("end", endImage);
  end.visible = false;
  
  sound.loop();
  
  railGroup = new Group();
  coinGp = new Group();
  energyGp = new Group();
  bombGp = new Group();

  score = 0;
}

function draw() {
  
  background("#c2b280");
  textSize(15);
  fill("white");
  stroke("white");
  text("score :" + score, 360, 50);
  
  
  rails();
  
  score = score + Math.round(getFrameRate()/60);
  
  if(gameState === START){
    if(keyDown("space")){
      gameState = PLAY;
    }   
  } else if (gameState === PLAY){
    start.destroy();
    player.visible = true;
    rail1.visible = true; 
    rail2.visible = true;
    rail3.visible = true;  
    
  
   var select_object = Math.round(random(1,3));
   if(World.frameCount % 30 == 0){
     if(select_object == 1){
       coin();
     }
     else if(select_object == 2){
       bomb();
     }
     else{
       energy();
     }
   }
    track1.velocityY = 4;
    track2.velocityY = 4;
    track3.velocityY = 4;
    track4.velocityY = 4;
    track5.velocityY = 4;
    track6.velocityY = 4;
    
    if(track1.y>600||track2.y>600||track3.y>600||track4.y>600||track5.y>600||track6.y>600){
      track1.velocityY = 0;
      track2.velocityY = 0;
      track3.velocityY = 0;
      track4.velocityY = 0;
      track5.velocityY = 0;
      track6.velocityY = 0;    
    }

    if(player.x == 300||player.x == 500||player.x == 100){
      player.velocityX = 0;
    } 

    if(keyDown("right")&&player.x<500){
      player.velocityX = 8;
    }

    if(keyDown("left")&&player.x>100){
      player.velocityX = -8;
    }
    
    if(coinGp.isTouching(player)){
      coinGp.destroyEach();
    }
    
    if(bombGp.isTouching(player)){
      gameState = END;
    }
    
    if(energyGp.isTouching(player)){
      energyGp.destroyEach();
    }
  }  else if (gameState === END){
     player.destroy();
     coinGp.destroyEach();
     bombGp.destroyEach();
     energyGp.destroyEach();
     track1.destroy();
     track2.destroy();
     track3.destroy();
     track4.destroy();
     track5.destroy();
     track6.destroy();     
     railGroup.destroyEach();
    
     background(0);
     
    end.visible = true; 
  }
  
  drawSprites();
  
  if(gameState == START){
    stroke("white");
    fill("white")
    textSize(30);
    text("Press Space to continue ", 170, 500); 
    text("Use right and left keys to move", 150, 450);
  }
}

function rails(){
  
  //Creating the rails
  if(frameCount%20 === 0) {   
    for (var a = 0; a < 50; a=a+50){
      rail1 = createSprite(100,a,100,10);
      rail1.velocityY = 4;
                 
      rail2 = createSprite(300,a,100,10);
      rail2.velocityY = 4;
            
      rail3 = createSprite(500,a,100,10);
      rail3.velocityY = 4;
      
      railGroup.add(rail1);
      railGroup.add(rail2);
      railGroup.add(rail3);      
                 
      //adjusting the depths      
      player.depth = rail1.depth;
      rail1.depth = rail1.depth+1;
      
      player.depth = rail2.depth;
      rail2.depth = rail2.depth+1;
      
      player.depth = rail3.depth;
      rail3.depth = rail3.depth+1;
            
      rail1.visible = false;
      rail2.visible = false;
      rail3.visible = false;
    }
  }
}

















