var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var map_width = canvas.width = canvas.scrollWidth = 1280;
var map_height = canvas.height = canvas.scrollHeight = 640;
var player_sprite = new Image();
var player = undefined;
var keys = [];

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
        if(keys[KEY_RIGHT] || keys[KEY_D])
        {
            this.x += this.velocity.x;
        }
        if(keys[KEY_LEFT] || keys[KEY_A])
        {
            this.x -= this.velocity.x;
        }
        if(keys[KEY_UP] || keys[KEY_W])
        {
            this.y -= this.velocity.y;
        }
        if(keys[KEY_DOWN] || keys[KEY_S])
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
    keys[event.keyCode] = true;
}

function KeyReleased(event)
{
    keys[event.keyCode] = false;
}

window.addEventListener("load",Start);
window.addEventListener("keypress",KeyPressed);
window.addEventListener("keydown",KeyReleased);