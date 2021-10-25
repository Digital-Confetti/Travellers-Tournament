export class Play_Select_Scene extends Phaser.Scene{

    constructor() {
        super({ key: 'select_menu_Scene' });

        this.background;
        
        this.text1;
        
        this.text2;

        this.salir;

        this.pointer;
    }

    preload() {
        console.log('Menu Seleccion Escena');

        //this.scene.launch("game_Scene");

        this.load.image('fondoseleccion', 'stores/menu/seleccion_perosnajes2.jpg');
        this.load.image('gunlegends', 'stores/menu/grunlegend.png');
        this.load.image('otonai', 'stores/menu/grunlegend.png');
        this.load.image('otonai_player', 'stores/menu/OTONAI_jugador.png');
        this.load.image('botonsalir', 'stores/menu/button/boton_salir.png');
        this.load.image('botonsalir2', 'stores/menu/button/boton_salir_pulsado.png');
        this.load.image('grunlegends_player', 'stores/menu/grunlegends_jugador.png');
    }

    create() {
        this.TeclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.TeclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.TeclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.TeclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.iniciar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.menu_boton = 0;


        this.background = this.add.image(0, 0, 'fondoseleccion');
        this.background.setScale(1.4);
        this.background.setOrigin(0);

        this.salir = this.add.image(100, 50, 'botonsalir').setInteractive();
        this.salir.setScale(1);
        this.salir_luz = this.add.image(100, 50, 'botonsalir2').setInteractive();
        this.salir_luz.setScale(1);
        this.salir_luz.alpha = 0;
        this.grunlegendsboton = this.add.image(670, 210, 'gunlegends').setInteractive();
        this.grunlegendsboton.setScale(1.2);
        this.grunlegendsboton.alpha=0.4;
        //player 1
        this.Otonaiplayer = this.add.image(200, 180, 'otonai_player').setInteractive();
        this.Otonaiplayer.setScale(1.2);
        this.Otonaiplayer.alpha=0;
        
        this.grunlegendplayer = this.add.image(230, 180, 'grunlegends_player').setInteractive();
        this.grunlegendplayer.setScale(1.0);
        this.grunlegendplayer.alpha=0;
        //player 2
        this.Otonaiplayer2 = this.add.image(200, 480, 'otonai_player').setInteractive();
        this.Otonaiplayer2.setScale(1.2);
        this.Otonaiplayer2.alpha=0;
        
        this.grunlegendplayer2 = this.add.image(220, 480, 'grunlegends_player').setInteractive();
        this.grunlegendplayer2.setScale(1.0);
        this.grunlegendplayer2.alpha=0;

        ////
        this.otonaiboton = this.add.image(1000, 210, 'otonai').setInteractive();
        this.otonaiboton.setScale(1.2);
        this.otonaiboton.alpha=0.1;
        
        
        //this.salir = this.add.text(50,50,'Salir', { color: '#000000', fontSize: '40px', fontFamily: 'Gemunu Libre'});
        //this.salir.setInteractive();

        //this.events.emit ('gameCountDown', ({countDown: 10}));
        
        var that = this;
        this.grunlegendsboton.on('pointerdown', function(pointer){
            console.log('Personaje 1 seleccionado');
           that.scene.start("game_Scene", {character: 'grundlegend'});
        });
        this.otonaiboton.on('pointerdown', function(pointer){
            console.log('Personaje 1 seleccionado');
           that.scene.start("game_Scene", {character: 'grundlegend'});
        });
        this.salir_luz.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("menu_Scene");
        });
        this.iniciar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update() {
        var that = this;
        this.salir.on('pointerover', function(pointer){
            //console.log(that.boton1_luz);           
            that.salir_luz.alpha = 1;           
        });
        this.grunlegendsboton.on('pointerover', function(pointer){
            //console.log('Personaje 1 seleccionado');
            that.grunlegendsboton.alpha = 0.4;
            that.otonaiboton.alpha = 0.1;
            that.salir_luz.alpha = 0;
            that.Otonaiplayer.alpha=0;
            that.grunlegendplayer.alpha=1;   
        });
        this.otonaiboton.on('pointerover', function(pointer){
            console.log('Personaje 1 seleccionado');
            that.otonaiboton.alpha = 0.4;
            that.grunlegendsboton.alpha = 0.1;
            that.salir_luz.alpha = 0; 
            that.Otonaiplayer.alpha=1;
            that.grunlegendplayer.alpha=0;  
        });
        if(this.TeclaA.isDown || this.TeclaW.isDown ){           
            if (this.grunlegendsboton.alpha == 0.4){
                        console.log('1')
                        this.Otonaiplayer.alpha=1;
                        this.grunlegendplayer.alpha=0;
                        this.otonaiboton.alpha = 0.4;
                        this.grunlegendsboton.alpha = 0;
                        this.menu_boton = 0;
                        this.salir_luz.alpha = 0;
                }else if (this.salir_luz.alpha == 1){
                        console.log('3')
                        this.Otonaiplayer.alpha=0;
                        this.grunlegendplayer.alpha=1;
                        this.otonaiboton.alpha = 0;
                        this.grunlegendsboton.alpha = 0.4 ;
                        this.menu_boton = 0;
                        this.salir_luz.alpha = 0;
                        
                }else if(this.otonaiboton.alpha == 0.4){
                    console.log('2')
                    this.Otonaiplayer.alpha=0;
                    this.grunlegendplayer.alpha=0;
                    this.otonaiboton.alpha = 0;
                    this.grunlegendsboton.alpha = 0;
                    this.menu_boton = 1;
                    this.salir_luz.alpha = 1;
                }
            }else if(this.TeclaD.isDown || this.TeclaS.isDown ){
                if (this.grunlegendsboton.alpha == 0.4){
                    console.log('1')
                    this.Otonaiplayer.alpha=0;
                    this.grunlegendplayer.alpha=0;
                    this.otonaiboton.alpha = 0;
                    this.grunlegendsboton.alpha = 0;
                    this.menu_boton = 0;
                    this.salir_luz.alpha = 1;
                    //console.log(this.menu_boton);
                }else if (this.salir_luz.alpha == 1){
                    console.log('3')
                    this.Otonaiplayer.alpha=1;
                    this.grunlegendplayer.alpha=0;
                    this.otonaiboton.alpha = 0.4;
                    this.grunlegendsboton.alpha = 0 ;
                    this.menu_boton = 0;
                    this.salir_luz.alpha = 0;                  
                }else if(this.otonaiboton.alpha == 0.4){
                    console.log('2')
                    this.Otonaiplayer.alpha=0;
                    this.grunlegendplayer.alpha=1;
                    this.otonaiboton.alpha = 0;
                    this.grunlegendsboton.alpha = 0.4;
                    this.menu_boton = 1;
                    this.salir_luz.alpha = 0;
                }
        }
        this.pointer = this.input.activePointer;
        if(this.iniciar.isDown){
            console.log('enter')
            this.scene.start("game_Scene", {character: 'grundlegend'});
        }
        //console.log(this.pointer.x, this.pointer.y);
    }
}