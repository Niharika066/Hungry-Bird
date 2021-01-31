
  var bird,birdImg, ground,cloud,cloudImg;
  var food,foodImg, obstacle, ObstacleImage;
  var FoodGroup, obstaclesGroup, BananaGroup;
  var survivalTime=0, score=0;

  function preload(){
birdImg=loadImage("bird.png")
    foodImg=loadImage("food.png")
    ObstacleImage = loadImage("helicopter.png");
    cloudImg=loadImage("cloud.png")
  }

  function setup(){
    createCanvas(1000,300);
 
    //create groups
    foodGroup= new Group();
    obstaclesGroup= new Group();
    cloudGroup=new Group();
    //create monkey sprite
    bird=createSprite(80,215,20,20);
    bird.addImage(birdImg);
    bird.scale=0.1;
    //monkey.debug=true;
    //create ground sprite
    
   ground=createSprite(400,290,3000,20);
    ground.velocityX=-4;
    ground.x=ground.width/2;
    ground.shapeColor="green";
    //create an invisible ground
    invisibleGround = createSprite(400,290,3000,120);
    invisibleGround.visible = false;
    }
  function draw(){
    background(117, 211, 226);
    //console.log(monkey.y);

    //give controls to game
    if(keyDown("space") && bird.y >= 100) {
      bird.velocityY = -10;
    }        

    bird.velocityY = bird.velocityY + 0.8  

  if(ground.x<0){
      ground.x=30;
    }
    bird.collide(invisibleGround); 

    //add survival time
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("survivalTime:"+survivalTime, 30,30);   
    
    stroke("white");
    textSize(20);
    fill("white");
    text("score="+ score, 270,30);
    
    if(bird.isTouching(foodGroup)){
      score=score+2;
      foodGroup.destroyEach();
      switch(score){
        case 10:bird.scale=0.12;
        break;
        case 20:bird.scale=0.14;
        break;
        case 30:bird.scale=0.16;
        break;    
        case 40:bird.scale=0.18;
        break;      
        default: break;
      }
    }
    
    if(bird.isTouching(obstaclesGroup)){
      bird.scale=0.1;
    }
    
    drawSprites();
    spawnfood();
    spawnObstacles();
spawnclouds();
  }
  //create function for spawning obstacles
  function spawnObstacles(){
    if (frameCount % 150 === 0) {
      var obstacle = createSprite(700,50,40,10);
      obstacle.y = Math.round(random(250,100));
      obstacle.addImage(ObstacleImage);
     obstacle.scale = 0.25;
      obstacle.velocityX = -6;
      obstacle.lifetime=400;  
      obstaclesGroup.add(obstacle);  
  }
  }
  //create function fpr spawning bananas
  function spawnfood() {
    if (frameCount % 80 === 0) {
      var food = createSprite(400,50,40,10);
      food.y = Math.round(random(100,120));
      food.addImage(foodImg);
     food.scale = 0.1;
      food.velocityX = -6;
      food.lifetime=200;  
      foodGroup.add(food);
    }
  }
  function spawnclouds(){
    if (frameCount % 230 === 0) {
      var cloud = createSprite(950,35,40,10);
      cloud.x = Math.round(random(900,400));
      cloud.addImage(cloudImg);
    cloud.scale = 0.04;
      cloud.velocityX = -6;
      cloud.lifetime=400;  
      cloudGroup.add(cloud);
    
  }
  }