const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
//variables are used to store only 1 value but arrays are used to store multiple values
//arrays always start from index 0 and are given in square brackets[]
var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  //cannonBall = new CannonBall(cannon.x, cannon.y);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  ground.display();
  
  cannon.display();
  tower.display();
  //cannonBall.display()
 
  //for loop is used to repeat the code again and again
  //initialization; condition ; updation (increment or decrement)
  for(var i = 0; i< balls.length; i++)
  {
    showCannonBalls(balls[i],i);
  }

Engine.update(engine);

}

function showCannonBalls(ball,index)
{
  ball.display();

  if(ball.body.position.x >= width || ball.body.position.y >=height-50)
  {
    //Another function from Matter.World (remove)
    Matter.World.remove(world,ball.body);
    //used to remove the body. There are 2 parameters: position and how many bodies you want to remove at a time
    balls.splice(index,1);
  }

}

function keyPressed()
{

  if(keyCode === DOWN_ARROW)
  {
    var cannonball = new CannonBall(cannon.x,cannon.y);
    //Here there are 2 different push and pop: Push = to add a body and Pop = to remove a body
    balls.push(cannonball);
  }

}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    //balls.length is the used to find the amount of bodies you have used
    balls[balls.length-1].shoot();
  }
}
