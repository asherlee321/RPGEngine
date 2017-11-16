var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var map_width = canvas.width = canvas.scrollWidth = 1280;
var map_height = canvas.height = canvas.scrollHeight = 640;
var player_sprite = new Image();
var player = undefined;
var keys = [];
var KEY_RIGHT = 39;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_A = 65;
var KEY_D = 68;
var KEY_S = 83;
var KEY_W = 87;
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
        case KEYS_UP:
            keysBool.up = true;
            break;
        case KEYS_DOWN:
            keysBool.down = true;
            break;
        case KEYS_LEFT:
            keysBool.left = true;
            break;
        case KEYS_RIGHT:   
            keysBool.right = true;
            break;    
    }
}

function KeyReleased(event)
{
    //keys[event.keyCode] = false;
    switch(event.keyCode){
        case KEYS_UP:
            keysBool.up = false;
            break;
        case KEYS_DOWN:
            keysBool.down = false;
            break;
        case KEYS_LEFT:
            keysBool.left = false;
            break;
        case KEYS_RIGHT:   
            keysBool.right = false;
            break;    
    }
}

window.addEventListener("load",Start);
window.addEventListener("keypress",KeyPressed);
window.addEventListener("keydown",KeyReleased);
