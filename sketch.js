
var gameState = "Start";
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets, bulletsImg, bulletGroup;

var score = 0 

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/Soldier_Standing.png")

  shooter_shooting = loadImage("assets/Soldier_Shooting.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.png")

  bulletsImg = loadImage("assets/bullet_Img.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1100, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = false;
   player.setCollider("rectangle",0,0,200,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.visible = false;
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  background(0); 


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  createBullet();
  player.addImage(shooter_shooting)
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(bulletGroup)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(bulletGroup)){
       zombieGroup[i].destroy()
       bulletGroup.destroyEach()
       score = score + 1;
       } 
 }
}

//calling the function to spawn zombies
enemy();

drawSprites();

if(gameState === "Start"){
heart3.visible = true;
}

fill("white")
textSize(20)
text("Score : "+ score, displayWidth/9, displayHeight/6)


if(player.isTouching(zombieGroup) && gameState === "Start"){
  heart2.visible = true;
  heart3.visible = false
  gameState = "play1"
}

if(player.isTouching(zombieGroup) && gameState === "play1"){
  heart1.visible = true;
  heart2.visible = false
  gameState = "play2"
}

if(gameState === "End"){
  player.velocityY = 0;

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,200,800)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }


}

function createBullet(){

  var bullets = createSprite(displayWidth-1000,displayHeight-290,50,50);
  bullets.y = player.y
  bullets.scale = 0.1
  bullets.addImage(bulletsImg)
  bullets.x = 360;
  bullets.velocityX = +4;
  bullets.lifetime = 200

  bulletGroup.add(bullets)
}

}