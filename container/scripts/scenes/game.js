// importing
import { GrundLegend } from '../player/grundlegend.js';
import { Ottonai } from '../player/ottonai.js';
import { Player } from '../player/player.js';
import { PunchingBag } from '../player/punchingbag.js';
import { EspecialDeTuichi } from '../powerups/especialdetuichi.js';
import { BebidaEnergetica } from '../powerups/bebidaenergetica.js';
import { Platano } from '../powerups/platano.js';
import { Pistola } from '../powerups/pistola.js';
import { Fusil } from '../powerups/fusil.js';

// exporting
export class Game_Scene extends Phaser.Scene {



    constructor() {
        super({ key: 'game_Scene' });

        this.player;
        this.player2;

        this.platforms;

        // Timers
        this.timer_dash;
        this.powerUp_duration_timer;

        // debug
        this.text_Debug;
        this.text_vida;
        this.text_velocidad;

        // s -> ms
        this.dashCoolDown = 3 * 1000;
        this.power_ups_respawn_cooldown = 5 * 1000;

        // receiver of the selected character
        this.selectedCharacter;

        //active powerup
        this.activePowerUp = null;
        this.power_up_spawned = false;

        //first player-powerup collider
        this.game_player_powerup_collider;

    }

    init(data) {
        // saving the selected character
        this.selectedCharacter = data.character;

    }

    preload() {
        // loading the spritesheet on 

        //let route = "stores/characters/" + this.selectedCharacter;
        this.load.atlas('grundlegend', "stores/characters/grundlegend.png", "stores/characters/grundlegend.json");         
        this.load.atlas('ottonai', "stores/characters/ottonai.png", "stores/characters/ottonai.json");

        this.load.atlas("PunchingBag", "stores/characters/PunchingBag/PunchingBag.png", "stores/characters/PunchingBag/PunchingBag.json");

        //this.load.atlas(this.selectedCharacter, "stores/characters/a.png", "stores/characters/a.json");


        console.log(this.textures)
        //this.load.spritesheet('byConfetti', 'stores/characters/by_Confetti.png', { frameWidth: 60, frameHeight: 84 });
        this.load.image('fondoescenario', 'stores/schenery/fondo_escenario.jpg');
        this.load.spritesheet('dude', 'stores/characters/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('large_ground', 'stores/schenery/Layer_large.png');
        this.load.image('medium_ground', 'stores/schenery/Layer_medium.png');
        this.load.image('short_ground', 'stores/schenery/Layer_short.png');
        

        //powerups
        this.load.spritesheet('especialdetuichi', 'stores/powerups/especialdetuichi.png', { frameWidth: 383, frameHeight: 312 });
        this.load.spritesheet('bebidaenergetica', 'stores/powerups/bebidaenergetica.png', { frameWidth: 190, frameHeight: 331 });
        this.load.spritesheet('platano', 'stores/powerups/platano.png', { frameWidth: 161, frameHeight: 151 });
        this.load.spritesheet('pistola', 'stores/powerups/pistola.png', { frameWidth: 361, frameHeight: 241 });
        this.load.spritesheet('fusil', 'stores/powerups/fusil.png', { frameWidth: 855, frameHeight: 251 });
        this.load.spritesheet('disparo', 'stores/powerups/disparo.png', { frameWidth: 111, frameHeight: 31 });


    }

    // Function thats add all the sprites to the gameObjects
    createGameObjects() {
        // Creating the player
        if (this.selectedCharacter == 'avalor') {
            this.player = new Avalor(this, 100, 100);

        } else if (this.selectedCharacter == 'grundlegend') {
            this.player = new GrundLegend(this, 100, 100);
            this.player2 = new Ottonai(this, 1000, 100);
        } else {
            console.log('error al crear personaje')
        }
        // Creating Punching Bag

        this.punchingBag = new PunchingBag(this, 600, 100);

        //this.activePowerUp = new Fusil(this, 600, 500);

        // Creating Platforms
        this.platforms = this.physics.add.staticGroup();

        //Bottom layer
        this.platforms.create(320,600, 'large_ground').setScale(2.5, 2).refreshBody();
        this.platforms.create(960,600, 'large_ground').setScale(2.5, 2).refreshBody();

        //Medium layer
        this.platforms.create(640,450, 'medium_ground').setScale(2.5, 2).refreshBody();

        //Upper layer
        this.platforms.create(180,300, 'medium_ground').setScale(2.5, 2).refreshBody();
        this.platforms.create(1100,300, 'medium_ground').setScale(2.5, 2).refreshBody();

        // Add collider
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.punchingBag, this.hit_Treatment, null, this);

        this.physics.add.collider(this.player2, this.platforms);
        this.physics.add.collider(this.player2, this.punchingBag, this.hit_Treatment, null, this);

        this.physics.add.collider(this.player2, this.player, this.hit_Treatment_2P, null, this);

        //this.game_player_powerup_collider = this.physics.add.collider(this.player2, this.activePowerUp, this.pickPowerUp, null, this);

        this.physics.add.collider(this.punchingBag, this.platforms);
        //this.physics.add.collider(this.activePowerUp, this.platforms);

        //this.game_player_powerup_collider = this.physics.add.collider(this.player, this.activePowerUp, this.pickPowerUp, null, this);
    }

    //TO DO: Use JSON atlas.
    // Fuctiong thats create the animations
    createAnimations() {

        // Debug Punching Bag animations

        this.anims.create({
            key: 'PB_punch',
            frames: [
                {
                    key: "PunchingBag",
                    frame: "PunchingBag_2.png"
                },
                {
                    key: "PunchingBag",
                    frame: "PunchingBag_3.png"
                },
                {
                    key: "PunchingBag",
                    frame: "PunchingBag_4.png"
                },
            ],
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'PB_idle',
            frames: [{ key: "PunchingBag", frame: "PunchingBag_2.png" }],
            frameRate: -1
        });

    }

    timer_Create() {

        // Dash Timer
        this.timer_dash = this.time.addEvent({ delay: this.dashCoolDown, loop: true });

    }

    create() {

        //this.timer_Create();
        this.background = this.add.image(0, 0, 'fondoescenario');
        this.background.setScale(1.4);
        this.background.setOrigin(0);
        // Adding sprites
        this.createGameObjects();

        // Creating animations
        this.createAnimations();

        // Declarating input methods
        this.inputDeclaration();

        // text debug
        this.text_Debug = this.add.text(32, 32);
        this.player.play('idle');
        this.punchingBag.play('PB_idle');
        this.text_vida = this.add.text(32, 82);

        this.text_velocidad = this.add.text(32, 132);

    }

    spawnPowerUp(){
        this.i = Math.floor(Math.random() * 5) + 1;
        //this.i = 3;
        this.x = Math.floor(Math.random() * 1080) + 200;
        this.y = 50;

        if(this.i == 1){
            this.activePowerUp = new EspecialDeTuichi(this, this.x, this.y);

        }else if(this.i == 2){
            this.activePowerUp = new BebidaEnergetica(this, this.x, this.y);

        }else if(this.i == 3){
            this.activePowerUp = new Platano(this, this.x, this.y);
            
        }else if(this.i == 4){
            this.activePowerUp = new Pistola(this, this.x, this.y);
            
        }else if(this.i == 5){
            this.activePowerUp = new Fusil(this, this.x, this.y);
        }
        this.physics.add.collider(this.activePowerUp, this.platforms);
        this.game_player_powerup_collider = this.physics.add.collider(this.player, this.activePowerUp, this.pickPowerUp, null, this);
    }

    update(timer, delta) {

        //this.timer_Update();

        this.player.update(delta);
        this.player2.update(delta);

        this.punchingBag.renove(delta);
        var out;

        out = 'Progreso: ' + this.player.dash_Timer.getProgress().toString().substr(0, 4);

        this.text_Debug.setText(out);

        this.text_vida.setText('Vida: ' + this.player.getVida());

        this.text_velocidad.setText('Velocidad: ' + this.player.horizontalSpeed);

        
        if (this.activePowerUp !== null) {

            //console.log(this.activePowerUp.picked);
            if (this.activePowerUp.picked) {
                
                this.activePowerUp.trigger(delta);
            }
        }else{
            if(!this.power_up_spawned){
                this.power_up_spawned = true;
                this.time.delayedCall(this.power_ups_respawn_cooldown, this.spawnPowerUp, null, this);

            }
            
        }
        
    }

    hit_Treatment_2P()
    {
        if (this.player2.playerStatus != Player.PlayerStatus.ATA_N)
        {
            if (this.player.playerStatus == Player.PlayerStatus.DASHING && this.player2.playerStatus != Player.PlayerStatus.HITTED)
            {
                this.player2.x_move = 2;
                this.player2.y_move = -250;
                this.player2.looking_R = this.player.x < this.punchingBag.x;
                this.player2.playerStatus = Player.PlayerStatus.HITTED;
                this.player2.lauch_reset_HITTED();
            } else if (this.player.playerStatus == Player.PlayerStatus.ATA_N && this.player2.playerStatus != Player.PlayerStatus.HITTED)
            {
                this.player2.x_move = 2;
                this.player2.y_move = -250;
                this.player2.looking_R = this.player.x < this.punchingBag.x;
                this.player2.playerStatus = Player.PlayerStatus.HITTED;
                this.player2.lauch_reset_HITTED();
            }
        }

        if (this.player.playerStatus != Player.PlayerStatus.ATA_N)
        {
            if (this.player2.playerStatus == Player.PlayerStatus.DASHING && this.player.playerStatus != Player.PlayerStatus.HITTED)
            {
                this.player.x_move = 2;
                this.player.y_move = -250;
                this.player.looking_R = this.player.x < this.punchingBag.x;
                this.player.playerStatus = Player.PlayerStatus.HITTED;
                this.player.lauch_reset_HITTED();
            } else if (this.player2.playerStatus == Player.PlayerStatus.ATA_N && this.player.playerStatus != Player.PlayerStatus.HITTED)
            {
                this.player.x_move = 1;
                this.player.y_move = -50;
                this.player.looking_R = this.player.x < this.punchingBag.x;
                this.player.playerStatus = Player.PlayerStatus.HITTED;
                this.player.lauch_reset_HITTED();
            }
        }
        
    }

    hit_Treatment()
    {
        if (this.player.playerStatus == Player.PlayerStatus.DASHING)
        {
            this.punchingBag.getHitted(this.player.x < this.punchingBag.x,2,-250);
        } else if (this.player.playerStatus == Player.PlayerStatus.ATA_N && !this.punchingBag.hited)
        {
            this.punchingBag.getHitted(this.player.x < this.punchingBag.x, 1,-50);
        }
    }

    pickPowerUp() {

        if (!this.activePowerUp.picked) {

            this.activePowerUp.collected();

        }
    }

    inputDeclaration() {

        // that
        var that = this.player;

        // Input event that checks when a key goes down
        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W && !that.keyW) {
                that.keyW = true;
                console.log('W Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && !that.keyA) {
                that.keyA = true;
                console.log('A Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && !that.keyS) {
                that.keyS = true;
                console.log('S Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && !that.keyD) {
                that.keyD = true;
                console.log('D Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE) {
                that.keySPACE = true;
                console.log('SPACE Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT) {
                that.keySHIFT = true;
                console.log('SHIFT Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.J) {
                that.keyNA = true;
                console.log('J Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.K) {
                that.keySA = true;
                console.log('K Pressed');
            }

        });

        // Input event that checks when a key goes up
        this.input.keyboard.on('keyup', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W && that.keyW) {
                that.keyW = false;
                console.log('W Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && that.keyA) {
                that.keyA = false;
                console.log('A Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && that.keyS) {
                that.keyS = false;
                console.log('S Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && that.keyD) {
                that.keyD = false;
                console.log('D Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE) {
                that.keySPACE = false;
                console.log('SPACE Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT) {
                that.keySHIFT = false;
                console.log('SHIFT Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.J) {
                that.keyNA = false;
                console.log('J Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.K) {
                that.keySA = false;
                console.log('K Depressed');
            }
        });

        // Mouse Input
        this.input.mouse.disableContextMenu();

        this.input.on('pointerdown', function (event) {
            if (event.rightButtonDown()) {
                that.keySA = true;
                console.log('RClick Pressed');
            } else if (event.leftButtonDown()) {
                that.keyNA = true;
                console.log('LClick Pressed');
            }
        });

        this.input.on('pointerup', function (event) {
            if (event.leftButtonReleased()) {
                that.keyNA = false;
                console.log('LClick Deressed');
            }
            else if (event.rightButtonReleased()) {
                that.keySA = false;
                console.log('RClick Depressed');
            }
        });
    }
}