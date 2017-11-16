var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var map_width = canvas.width = canvas.scrollWidth = 1280;
var map_height = canvas.height = canvas.scrollHeight = 640;
var player_sprite = new Image();
var player = undefined;
var keys = [];
var keysBool = {
    up: false,
    down: false,
    right: false,
    left: false
}

function Player(x,y,hspeed,vspeed)
{
    this.x = x;
    this.y = y;
    this.velocity = {
        x: hspeed,
        y: vspeed
    }
    this.update = function()
    {
        if(keysBool.right)
        {
            this.x += this.velocity.x;
        }
        if(keysBool.left)
        {
            this.x -= this.velocity.x;
        }
        if(keysBool.up)
        {
            this.y -= this.velocity.y;
        }
        if(keysBool.down)
        {
            this.y += this.velocity.y;
        }
    }
    this.draw = function()
    {
        context.drawImage(player_sprite,this.x,this.y);
    }
}

function Start()
{
    player = new Player(map_width/2,map_height/2,5,5);
    player_sprite.src = "g5144.png";
    Update();
}

function Update()
{
    draw_background("white");
    player.update();
    player.draw();
    requestAnimationFrame(Update);
}

function KeyPressed(event)
{
    //keys[event.keyCode] = true;
    switch(event.keyCode){
        case 38:
            keysBool.up = true;
            break;
        case 40:
            keysBool.down = true;
            break;
        case 37:
            keysBool.left = true;
            break;
        case 39:   
            keysBool.right = true;
            break;    
    }
}

function KeyReleased(event)
{
    //keys[event.keyCode] = false;
    switch(event.keyCode){
        case 38:
            keysBool.up = false;
            break;
        case 40:
            keysBool.down = false;
            break;
        case 37:
            keysBool.left = false;
            break;
        case 39:   
            keysBool.right = false;
            break;    
    }
}

window.addEventListener("load",Start);
window.addEventListener("keyup",KeyReleased);
window.addEventListener("keydown",KeyPressed);
