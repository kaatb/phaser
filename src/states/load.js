class LoadState extends Phaser.State {

    preload(){
        this.game.stage.backgroundColor = '#008376';

        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('star', 'assets/star.png');

        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.game.load.spritesheet('tile', 'assets/tileset.png', 64, 64, 1, 0);
    }

    create(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('PlayState');
    }
}

export default LoadState;