class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('shoe', './assets/shoe.png');
        this.load.image('sock', './assets/sock.png');
        this.load.image('city', './assets/city.png');
        // load spritesheet
        this.load.spritesheet('run-explosion', './assets/run-explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //load particles
        this.load.image('spark', './assets/gold.png');
      }
      
      
    create() {
        // place tile sprite
        this.city = this.add.tileSprite(0, 0, 640, 480, 'city').setOrigin(0, 0);
        // neon blue UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x93F9FF).setOrigin(0, 0);
        // light gray borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xDCDADA).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xDCDADA).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xDCDADA).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xDCDADA).setOrigin(0, 0);
        // add shoe (p1)
        this.p1Shoe = new Shoe(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'shoe').setOrigin(0.5, 0);
        // add socks (x3)
        this.sock01 = new Sock(this, game.config.width + borderUISize*6, borderUISize*4, 'sock', 0, 30).setOrigin(0, 0);
        this.sock02 = new Sock(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'sock', 0, 20).setOrigin(0,0);
        this.sock03 = new Sock(this, game.config.width, borderUISize*6 + borderPadding*4, 'sock', 0, 10).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('run-explosion', { start: 0, end: 9, first: 0}),
            frameRate: 20
        });
        // particles
        //this.createParticles();

        this.particles = this.add.particles('spark');
            
        let particleConfig = {
            x: 400,
            y: 300,
            speed: 200,
            lifespan: 500,
            blendMode: 'ADD',
            maxParticles: 50,
            scale: {start: 1, end: 0},
            on: false,
        };

        this.emitter = this.particles.createEmitter(particleConfig)
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            backgroundColor: '#F5BDBC',
            color: '#878787',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 
        this.p1Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() {
        this.city.tilePositionX -= 4;
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if (!this.gameOver) {               
            this.p1Shoe.update();         // update shoe sprite
            this.sock01.update();           // update socks(x3)
            this.sock02.update();
            this.sock03.update();
        } 
        // check collisions
        // check collisions
        if(this.checkCollision(this.p1Shoe, this.sock03)) {
            this.p1Shoe.reset();
            this.sockExplode(this.sock03);   
        }
        if (this.checkCollision(this.p1Shoe, this.sock02)) {
            this.p1Shoe.reset();
            this.sockExplode(this.sock02);
        }
        if (this.checkCollision(this.p1Shoe, this.sock01)) {
            this.p1Shoe.reset();
            this.sockExplode(this.sock01);
        }
    }

    checkCollision(shoe, sock) {
        // simple AABB checking
        if (shoe.x < sock.x + sock.width && 
            shoe.x + shoe.width > sock.x && 
            shoe.y < sock.y + sock.height &&
            shoe.height + shoe.y > sock. y) {
                return true;
        } else {
            return false;
        }
    }
    sockExplode(sock) {
        // temporarily hide sock
        sock.alpha = 0;
        // create run-explosion sprite at sock's position
        let boom = this.add.sprite(sock.x, sock.y, 'run-explosion').setOrigin(0, 0);
        this.particles.emitParticleAt(sock.x, sock.y, 50);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          sock.reset();                         // reset sock position
          sock.alpha = 1;                       // make sock visible again
          boom.destroy();                       // remove run-explosion sprite
        });
        // score add and repaint
        this.p1Score += sock.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_run-explode');
      }

  }