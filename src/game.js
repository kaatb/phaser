import LoadState from 'states/load';
import PlayState from 'states/play';

class Game extends Phaser.Game {

    constructor() {
        super(800, 600, Phaser.AUTO, 'phasergame', null);

        this.state.add('LoadState', LoadState, false);
        this.state.add('PlayState', PlayState, false);

        this.state.start('LoadState');
    }
}

new Game();