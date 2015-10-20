var game = new Phaser.Game(1000, 600, Phaser.AUTO, "game", 
        {preload:preload, update:update, create:create});

var wasd;
var walls;
var wall;
var blocks;
var block;
var keys;
var firstDoors;
var secondDoors;
var hasKey = 0;
var lava;
var lavas;
var enemyGroup;
var bitcoinGroup;
var menu;
var player;
var killCount = 0;
var door;
var baseDMG = 1;
var baseSPD = 1;
var baseHP = 1;
var baseFR = 1;
var pauseInput;
var background;
var gameEndText;

// text related globals
var coinText;
var coinString;

function preload () {

    /* IMAGE FILES */
    game.load.image('background2','images/space_mac.png');
    game.load.image('background','images/xp.jpg');
    game.load.image('sandbrick','images/sandBrick.png');
    game.load.image('lava', 'images/firewall.png');
    game.load.image('wall', 'images/wall.jpg');
        // http://i.ytimg.com/vi/fdJrQMvLHSM/hqdefault.jpg
    game.load.image('XP', 'images/windowsXP.jpg');
        //www.hdwallpapers.in
    game.load.image('key', 'images/usb.png');
    game.load.image('door', 'images/stone.png');
    game.load.image('downloadDoor','images/download.png');
    game.load.image('firstDoor', 'images/tower.png');
    game.load.image('space', 'images/Deep-Space.jpg');
    
    // from ship sprite pack
    game.load.image('speedship','ship_sprites/speedship.png');
    game.load.image('heavyship','ship_sprites/heavyfreighter.png');
    game.load.image('elShip','ship_sprites/elShip.png');

    game.load.image('turrett','ship_sprites/medfrighter.png');
        // cliparts.co (from Spaceship concept art for ELYSIUM by Ben Mauro)
    game.load.image('player1','images/basicCar.png'); // player 1
        // http://www.xnadevelopment.com/sprites/images/Car.png
    game.load.image('player2','ship_sprites/medfighter.png');  // player 2
        // (from ship sprite pack)
    game.load.image('coin','images/bitcoin.png');
    game.load.image('dogecoin','images/dogen.png');
        // http://howtodoge.com/images/dogen.png
    game.load.image('enemy_bullet','images/bullet_2.png');
        // digitalmoneytimes.com
    game.load.image('pokeball','images/pokeball.png');
        // http://creepypasta81691.deviantart.com/art/Pokeball-Sprite-295593219
    game.load.image('tomato','images/Tomato-Sprite.png');
        // http://img4.wikia.nocookie.net/__cb20140326231144/
        //                  herebemonsters/images/b/b7/Tomato-Sprite.png
    game.load.image('bomb','images/bomb.png'); 
        // http://www.zeldaelements.net/images/games/
        //              the_minish_cap/items_and_equipment/bombs.png
    game.load.spritesheet('explosion','images/explosion.png',60,60);
        // korzonrocknet.deviantart.com
    game.load.spritesheet('tomatoExplosion','images/tomato_explosion.png',222,222);
        //
    game.load.image('bluBall','images/blueBall.png');
        // http://www.zeldadungeon.net/wiki/images/a/a9/Ball-1.png
    game.load.image('greenBeam','images/laser.png'); 
        //https://qph.is.quoracdn.net/main-qimg-
        //             826a2483ab9104e55abf64f8ddaf2251?convert_to_webp=true
    game.load.image('nuke','images/nuke.png'); 
        // bay12forums.com user "Shook"
    game.load.image('aBomb','images/A-Bomb_Mk_2.gif');
        // A-bomb by Ironcommando   

    game.load.image('menu','images/menu.png');
    game.load.json('difficulty', 'settings.json'); // loading JSON

    // barrel sprite posted on http://opengameart.org/ by user truezipp
    game.load.image('blueBall_barrel','images/blueBall_barrel.png');
    game.load.image('bomb_barrel','images/bomb_barrel.png');
    game.load.image('laser_barrel','images/laser_barrel.png');
    game.load.image('poke_barrel','images/poke_barrel.png');
    game.load.image('tomato_barrel','images/tomato_barrel.png');
    game.load.image('nuke_barrel','images/nuke_barrel.png');

    /* SOUND FILES */
    game.load.audio('startScene', 'audio/All of Us.mp3');
    game.load.audio('bossScene', "audio/We're the Resistors.mp3");
    game.load.audio('endScene', "audio/We're all under the stars.mp3");
    game.load.audio('bulletsFX', 'audio/bullets.wav');
    game.load.audio('lasersFX', 'audio/lasers.wav');
    game.load.audio('rocketsFX', 'audio/rockets.wav');
    game.load.audio('nukesFX', 'audio/nukes.wav');
    game.load.audio('multiBulletsFX', 'audio/multiBullets.wav');
    game.load.audio('multiLasersFX', 'audio/multiLasers.wav');
    // game.load.audio('multiLasersFX', 'audio/multiLasers_b.wav');
    game.load.audio('hitFX', 'audio/hit.wav');
    game.load.audio('explosion1FX', 'audio/explosion1.wav');
    game.load.audio('explosion2FX', 'audio/explosion2.wav');
    game.load.audio('explosion3FX', 'audio/explosion3.wav');
    game.load.audio('explosion4FX', 'audio/explosion4.wav');
    game.load.audio('coinFX', 'audio/coin.wav');
    game.load.audio('rektFX', 'audio/rekt.wav');

}

function create() {

    // physics and backgrounds
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background2 = game.add.tileSprite(1470, 990, 2640, 1920, 'background2');
    background2.tileScale.setTo(1.2,1.5);
    background = game.add.tileSprite(0, 0, 2640, 1920, 'background');
    background.tileScale.setTo(1.375,1.6);

    /* AUDIO */
    startScene = game.add.audio('startScene');
    startScene.loop = true;
    bossScene = game.add.audio('bossScene');
    bossScene.loop = true;
    endScene = game.add.audio('endScene');
    bulletsFX = game.add.audio('bulletsFX');
    lasersFX = game.add.audio('lasersFX');
    rocketsFX = game.add.audio('rocketsFX');
    nukesFX = game.add.audio('nukesFX');
    multiBulletsFX = game.add.audio('multiBulletsFX');
    multiLasersFX = game.add.audio('multiLasersFX');
    hitFX = game.add.audio('hitFX');
    explosion1FX = game.add.audio('explosion1FX');
    explosion2FX = game.add.audio('explosion2FX');
    explosion3FX = game.add.audio('explosion3FX');
    explosion4FX = game.add.audio('explosion4FX');
    coinFX = game.add.audio('coinFX');
    rektFX = game.add.audio('rektFx');
    startScene.play(); //when the level starts

    // pause menu input
    pauseInput = game.input.keyboard.addKey(Phaser.Keyboard.P);

    //loading JSON for difficulty settings
    var settingsJSON = game.cache.getJSON('difficulty');
    baseDMG = settingsJSON.baseDMG;
    baseSPD = settingsJSON.baseSPD;
    baseHP = settingsJSON.baseHP;
    baseFR = settingsJSON.baseFR;

    // game bounds
    game.world.setBounds(0, 0, 2640, 1920);

    // walls
    walls = game.add.group();
    walls.enableBody = true;
    drawWalls();

    // blocks
    blocks = game.add.group();
    blocks.enableBody = true;
    drawBlocks();
    
    // lava
    game.lavas = game.add.physicsGroup();
    addLavas();

    // weapon groups
    projectiles = new Projectile(game);
    
    // player
    setSkin(1);
    player = new Player(game, 100, 100, P_skin);
    player.enableBody = true;
    player.body.collideWorldBounds = true;
    
    // enemies
    addEnemies();
    
    // bitcoins and bitcoin total tracking
    bitcoinGroup = game.add.group();
    coinString = 'Bitcoins: ';
    coinText = game.add.text(10, 10, coinString + player.cash, 
                        { font: '34px Arial', fill: 'red' });
    coinText.fixedToCamera = true;
    coinText.cameraOffset.setTo(750,60);

    // health bar
    healthString = 'Health: ';
    healthText = game.add.text(10, 10, healthString + player.health, 
                            { font: '34px Arial', fill: 'green' });
    healthText.fixedToCamera = true;
    healthText.cameraOffset.setTo(750,20);

    // doors and keys    
    firstDoor();
    secondDoors = game.add.group();
    secondDoors.enableBody = true;
    secondDoor = secondDoors.create(15, 940, 'door');
    secondDoor.body.immovable = true;
    secondDoor.scale.setTo(2.0, 1.0);
    setupKey();
    

    // download door
    downloadDoors = game.add.group();
    downloadDoors.enableBody = true;
    downloadDoor = downloadDoors.create(1500,1875,'downloadDoor');
    downloadDoor.body.collideWorldBounds = true;
    downloadDoor.body.immovable = true;
    downloadDoor.scale.setTo(0.25,0.25);
    downloadDoor.anchor.setTo(0.5,0.5);
    downloadDoor.angle += 270;

    // put the weapons caches in the game
    addCaches();

}

function update() {
    // HUD
    coinText.text = coinString + player.cash;
    healthText.text = healthString + player.health;

    // pause and unpause
    gamePause();
    game.input.onDown.add(gameUnpause,self);

    // player update
    updatePlayer();

    // wall collision prevention
    weaponCollisionsUpdate();
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(enemyGroup,walls);
    game.physics.arcade.collide(enemyGroup,firstDoors);
    game.physics.arcade.collide(player, blocks);
    game.physics.arcade.collide(block, walls);

    // lava/player collisions
    /*
    game.physics.arcade.overlap(lava, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava2, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava3, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava4, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava5, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava6, player, killPlayer, null, this);
    game.physics.arcade.overlap(lava7, player, killPlayer, null, this);*/

    // player/misc. collisions
    game.physics.arcade.collide(player, firstDoors, openDoor, null, this);
    game.physics.arcade.overlap(player, keys, collectKey, null, this);
    game.physics.arcade.collide(player, secondDoors);
    game.physics.arcade.overlap(player,downloadDoors,changeBackground,null,this);

    // handles door durability
    if (killCount == 7) {
        secondDoor.destroy();
    }
    if (killCount == 16) {
        game.add.text(player.x, player.y, "YOU WON!",
            { font: "30px Arial", fill: "#fff", align: "center" });
        game.time.events.add(Phaser.Timer.SECOND * 3, restart, this);
    }
    // homing weapons
    if (enemyGroup.length > 0) {
        rockets.forEachAlive(pickTarget,rockets);
        nukes.forEachAlive(pickTarget,nukes);
    }
}

function render() {
    game.debug.body(wall);
    game.debug.body(player);
}