// enemy.js
// ShooterBlaster enemy file

var enemyID = 0;

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

/*
function gettingHit(playerProjectiles){
    this.health -= playerProjectiles.power;
    this.dropCoin();

}
*/

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

    if (this.health <=0) {
        this.destroy();
        this.dropCoin();
        killCount += 1;
    } else {
        if (game.physics.arcade.distanceBetween(this,player) < this.aggro) {
            
            console.log('');

            game.physics.arcade.moveToObject(this, player, this.speed);
        }
    }
    game.physics.arcade.overlap(this, player, gettingHitByP, null, this);
    
    // Overlap with enemy fire
    game.physics.arcade.overlap(this,bullets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,rockets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,lasers,this.enemyTakesDamage,null,this);

}

// Lowers enemy health based on power of taken weapon fire
Enemy.prototype.enemyTakesDamage = function(enemy,projectile) {
    this.damage(projectile.parent.power);
    explode(projectile);
    console.log(this.health);
    //if (projectile.parent.homing) {
    //    explode(projectile);
    //} else {
        projectile.destroy();
  //  }
}


/*
var enemy;

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.force = {x:0.0, y:0.0};

function Enemy(game,x,y) {

    Phaser.Sprite.call(this, game, x, y, 'speedship');
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
    game.add.existing(this);

    this.body.setSize(20,20);

    this.health = 100;

    //  Show health (for debugging)
    healthText = game.add.text(16, 16, 'health: ' + this.health, 
                        { fontSize: '32px', fill: '#ffffff' });   

}

// Nothing is being called in here
Enemy.prototype.update = function() {

    healthText.text = 'health: ' + this.health; // display enemy health

    // collisions
    game.physics.arcade.overlap(this,bullets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,rockets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,lasers,this.enemyTakesDamage,null,this);

    while (this.health < 0) {
        this.health = 0;
    }

}

// Lowers enemy health based on power of taken weapon fire
Enemy.prototype.enemyTakesDamage = function(enemy,projectile) {

    this.damage(projectile.parent.power);
    
    if (projectile.parent.homing) {
        explode(projectile);
    } else {
        projectile.destroy();
    }

}
*/
