class PlayState extends Phaser.State {

    create(){
        this.game.add.sprite(0, 0, 'sky');

        var platforms = this.game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
    }

    update(){

    }
}

export default PlayState;