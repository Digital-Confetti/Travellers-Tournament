export class Poweups_Scene extends Phaser.Scene{

    constructor() {
        super({ key: 'select_menu_powerups' });

        this.background;

        this.salir;

        this.pointer;
    }

    preload() {
        console.log('Menu Seleccion powerups');

        //this.scene.launch("game_Scene");

        this.load.image('fondopowers', 'stores/menu/powerups.jpg');
        this.load.image('botonsalir', 'stores/menu/button/boton_salir_pulsado.png');

        this.load.audio('espada', 'stores/sounds/desenvainar_espada.mp3');
    }

    create() {
        this.background = this.add.image(0, 0, 'fondopowers');
        this.background.setScale(1.4);
        this.background.setOrigin(0);


        this.salir = this.add.image(60, 30, 'botonsalir').setInteractive();
        this.salir.setScale(0.7);

        //this.events.emit ('gameCountDown', ({countDown: 10}));
        
        var that = this;

        this.salir.on('pointerdown', function(pointer){
            that.sound.play('espada');
            that.scene.start("play_menu_Scene");
        })
        this.iniciar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update() {
        this.pointer = this.input.activePointer;
        if(this.iniciar.isDown){
            console.log('enter')
            this.sound.play('espada');
            this.scene.start('play_menu_Scene');
        }
        //console.log(this.pointer.x, this.pointer.y);
    }
}