let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

/*
Juan Gaito, Shoe Patrol, 6/28/21, 20 hours 
*/

/*
Include a comment in your main file that includes your points breakdown (along with any necessary explanation)
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60):
- artwork: new rocket, new explosion, new spaceships, and new background
- UI: new font (Impact) and new colors for website, score, letters, etc.
- Sound: new select, explosion, and shot sounds 

Finishing the Tutorial: an automatic 20 points.

Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
- Particle: gold explosion when shoe hits socks
*/

/* Credit:
Rocket Patrol Tutorial/Code Template: Nathan Altice
Sound: JFXR by frozenfractal 
Artwork created in: Aseprite
Color picker help: MDN Web Docs (Color Picker Tool)
In Collaboration with: jahunguy@ucsc.edu
Particles based on example from:
https://photonstorm.github.io/phaser3-docs/Phaser.Scale.html
https://labs.phaser.io/edit.html?src=src/game%20objects/particle%20emitter/create%20emitter.js&v=3.55.2
https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Particles.ParticleEmitter.html#scaleX__anchor
https://www.youtube.com/watch?v=JSrafZXuehQ
*/