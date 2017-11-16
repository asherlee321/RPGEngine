function draw_background(color)
{
    context.clearRect(0,0,map_width,map_height);
    context.fillStyle = color;
    context.fillRect(0,0,map_width,map_height);
}

function draw_rectangle(x,y,width,height,color)
{
    context.fillStyle = color;
    context.fillRect(x,y,width,height);
}

function draw_rectangle_outline(x,y,width,height,color,outline_color)
{
    context.fillStyle = color;
    context.fillRect(x,y,width,height);
    context.strokeStyle = outline_color;
    context.strokeRect(x,y,width,height);
}

function draw_circle(x,y,radius,color)
{
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI * 2,true);
    context.fill();
    context.closePath();
}

function draw_text(x,y,color,string)
{
    context.fillStyle = color;
    context.fillText(string,x,y);
}

function point_distance(x1,y1,x3,y3)
{
    var distance_x = x3 - x1;
    var distance_y = y3 - y1;
    return sqrt(power(distance_x,2) + power(distance_y,2));
}

function irandom_range(min,max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

function random_color()
{
    var chars = "ABCDEF";
    var color = "#";
    var type = 0;
    for(var i = 0; i < 6; i++)
    {
        type = irandom_range(0,2);
        if(type == 0)
        {
            color += irandom_range(0,9);
        }
        else
        {
            color += chars[irandom_range(0,chars.length)];
        }
    }
    return color;
}

function map(n,start1,stop1,start3,stop3)
{
    return ((n-start1)/(stop1-start1)) * (stop3-start3) + start3;
}

function sin(value)
{
    return Math.sin(value);
}

function cos(value)
{
    return Math.cos(value);
}

function tan(value)
{
    return Math.tan(value);
}

function power(base,value)
{
    return Math.pow(base,value);
}

function sqrt(value)
{
    return Math.sqrt(value);
}

function clamp(value,min,max)
{
    if(value < min)
    {
        value = min;
    }
    else if(value > max)
    {
        value = max;
    }
    return value;
}

function reset(value,min,max)
{
    if(value < min)
    {
        value = max;
    }
    else if(value > max)
    {
        value = min;
    }
    return value;
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}