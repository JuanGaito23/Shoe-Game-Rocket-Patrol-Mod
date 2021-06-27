class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select-v.2', './assets/blip_select-v.2.wav');
        this.load.audio('sfx_run-explode', './assets/run-explode.wav');
        this.load.audio('sfx_shoe', './assets/shoe_shot.wav');
      }
    create() {
      // menu text configuration
      let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
      }

      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'SHOE PATROL', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

       // define keys
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       }
   
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            sockSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select-v.2');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            sockSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select-v.2');
          this.scene.start('playScene');    
        }
      }
  }