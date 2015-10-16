var game = new Phaser.Game(1000, 600, Phaser.AUTO, "game", 
        {preload:preload, update:update, create:create});

var wasd;
var walls;
var wall;
var keys;
var doors;
var hasKey = 0;
var sandBricks;
var lava;
var enemyGroup;
var bitcoinGroup;
var player;
var sandBrick;
var killCount = 0;
var door;

function preload () {
	game.load.image('background','level_elements/CircuitBoard.jpg');
    game.load.image('wall', 'level_elements/wall.jpg');
        // http://i.ytimg.com/vi/fdJrQMvLHSM/hqdefault.jpg
    game.load.image('XP', 'level_elements/windowsXP.jpg');
        //www.hdwallpapers.in
    game.load.image('key', 'level_elements/key.png');
    game.load.image('door', 'level_elements/stone.png');
    game.load.image('sandBrick','level_elements/sandBrick.png');
    game.load.image('lava', 'level_elements/lava.png');
    game.load.image('endDoor', 'level_elements/door.jpg');
    game.load.image('space', 'level_elements/Deep-Space.jpg');
    game.load.image('speedship','ship_sprites/speedship.png'); // enemy 1
        // (from ship sprite pack)
    game.load.image('elShip','ship_sprites/elShip.png'); // enemy 2
        // cliparts.co (from Spaceship concept art for ELYSIUM by Ben Mauro)
    game.load.image('player1','player_vehicles/basicCar.png'); // player 1
        // http://www.xnadevelopment.com/sprites/images/Car.png
    game.load.image('player2','ship_sprites/medfighter.png');  // player 2
        // (from ship sprite pack)
    game.load.image('blueBall','weapons/blueBall.png'); 
        // http://www.zeldadungeon.net/wiki/images/a/a9/Ball-1.png
    game.load.image('bomb','weapons/bomb.png'); 
        // http://www.zeldaelements.net/images/games/
        //              the_minish_cap/items_and_equipment/bombs.png
    game.load.image('coin','level_elements/bitcoin.png');
        // digitalmoneytimes.com
    game.load.spritesheet('explosion','weapons/explosion.png',60,60);
        // korzonrocknet.deviantart.com
    game.load.image('pokeball','weapons/pokeball.png'); 
        // http://creepypasta81691.deviantart.com/art/Pokeball-Sprite-295593219
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.tileSprite(0, 0, 1920, 1920, 'XP');
	walls = game.add.group();
	walls.enableBody = true;

	drawWalls();
	
	setSkin(1);
	player = new Player(game, 70, 1550, P_skin);
	player.enableBody = true;
	player.body.collideWorldBounds = true;
	
	enemyGroup = game.add.group();
    
    enemy1 = new Enemy(game, 300, 1850, enemyType1);
    enemy2 = new Enemy(game, 400, 1500, enemyType1);
    enemy3 = new Enemy(game, 650, 1700, enemyType1);
    enemy4 = new Enemy(game, 900, 1800, enemyType1);
    enemy5 = new Enemy(game, 900, 1500, enemyType1);
    enemy6 = new Enemy(game, 900, 1880, enemyType1);
    enemy7 = new Enemy(game, 650, 1500, enemyType1);
    enemy8 = new Enemy(game, 1000, 700, enemyType1);
    enemy9 = new Enemy(game, 600, 900, enemyType1);
    enemy10 = new Enemy(game, 600, 100, enemyType1);
    enemy12 = new Enemy(game, 1000, 400, enemyType1);
    enemy13 = new Enemy(game, 1300, 100, enemyType1);
    enemy14 = new Enemy(game, 1500, 500, enemyType1);
    enemy15 = new Enemy(game, 50, 800, enemyType1);
    enemy16 = new Enemy(game, 500, 500, enemyType1);
    enemy17 = new Enemy(game, 1600, 1700, enemyType1);
    enemy18 = new Enemy(game, 1500, 1600, enemyType1);

    enemyType2 = setEnemyType(50,40,'elShip',100,20,250,0.5,100,100);
    enemy11 = new Enemy(game, 1500, 1700, enemyType2);

    // add in the bitcoinssss
    bitcoinGroup = game.add.group();

    // weapon groups
    projectiles = new Projectile(game);
	
    this.lavas = this.add.physicsGroup();
    addLavas();
    
    game.world.setBounds(0, 0, 1920, 1920);
    
    setupDoor();
    //setupSandBrick();
    endDoor();
    setupKey();
}

function update() {

	updatePlayer();

    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(player, doors, openDoor, null, this);
    game.physics.arcade.overlap(player, keys, collectKey, null, this);
    game.physics.arcade.collide(player, sandBricks);
    game.physics.arcade.overlap(lava, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava2, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava3, player, killPlayer, null, this);
    game.physics.arcade.collide(player, endDoors, openEndDoor, null, this);
    game.physics.arcade.overlap(sandBrick, projectiles, destroyBrick,null,this);

    weaponCollisions(bullets);
    weaponCollisions(rockets);
    weaponCollisions(lasers);


    // handles door durability
    if (killCount == 7) {
    	door.destroy();
    }

    // homing
    rockets.forEachAlive(pickTarget,rockets);

}


function render() {
	game.debug.body(wall);
	game.debug.body(player);
}

