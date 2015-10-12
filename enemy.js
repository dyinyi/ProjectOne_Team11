// enemy.js
// ShooterBlaster enemy file

var enemyID = 0;

var enemyType1 = setEnemyType(20,2,'speedship',100,200,250,0.75,10,18);

var E_type = { health:20, type:1, name:"N/A", speed:0, 
                coin:1, aggro:0, scale:1, sizeX:1, sizeY:1 };

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

//Enemy.prototype.gettingHit = gettingHit;

Enemy.prototype.gettingHitByP = gettingHitByP;
Enemy.prototype.dropCoin = dropCoin;
Enemy.prototype.enemyFire = enemyFire;

//Enemy.prototype.deploy = deploy;

function Enemy(game, x, y, E_type) {
    Phaser.Sprite.call(this, game, x, y, E_type.name);
    this.scale.setTo(E_type.scale,E_type.scale);
    this.anchor.setTo(0.5,0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
    enemyID += 1;
    this.body.setSize(E_type.sizeX,E_type.sizeY);
    this.health = E_type.health;
    this.type = E_type.type;
    this.name = E_type.name;
    this.speed = E_type.speed;
    this.coin = E_type.coin;
    this.aggro = E_type.aggro;
    enemyGroup.add(this);

}


//debugging function
function gettingHitByP(){
    killPlayer();
    this.dropCoin();
}

function setEnemyType(health, type, name, speed, coin, aggro, scale, sizeX, sizeY){
    var newE_type= {health:20, type:1, name:"N/A", speed:0, coin:0, dmg: 0};
    newE_type.health = health;
    newE_type.type = type;
    newE_type.name= name;
    newE_type.speed = speed;
    newE_type.coin = coin;
    newE_type.aggro = aggro;
    newE_type.scale = scale;
    newE_type.sizeX = sizeX;
    newE_type.sizeY = sizeY;

    return newE_type;

}

function enemyFire(type, pattern){
    //todo

}


function dropCoin(){
    new Bitcoin(game, this.position.x, this.position.y, this.coin);
}



Enemy.prototype.update = function(){

    // destroy enemy and release coin if health zero or less
    if (this.health <=0) {
        this.destroy();
        this.dropCoin();
        killCount += 1;
    } else {
        // move enemies toward player
        if (game.physics.arcade.distanceBetween(this,player) < this.aggro) {
            game.physics.arcade.moveToObject(this, player, this.speed);
        }
    }

    // checks for player-enemy overlap
    game.physics.arcade.overlap(this, player, gettingHitByP, null, this);
    
    // Overlap with play3r fire
    game.physics.arcade.overlap(this,bullets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,rockets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,lasers,this.enemyTakesDamage,null,this);

}

// Lowers enemy health based on power of taken weapon fire
Enemy.prototype.enemyTakesDamage = function(enemy,projectile) {

    // enemy takes damage
    this.damage(projectile.parent.power);

    // explosive projectiles (e.g., bombs/rockets) explode
    if (projectile.parent.homing) {
        explode(projectile);
    } else {
        projectile.destroy();
    }
}



