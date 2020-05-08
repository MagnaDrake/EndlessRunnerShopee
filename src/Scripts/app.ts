import "phaser";
import PreloadScene from "./Scene/PreloadScene";
import GameScene from "./Scene/GameScene";
type GameConfig = Phaser.Types.Core.GameConfig;
const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 1200;

const config: GameConfig = {
  title: "LariGan",
  scale: {
    parent: "game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  backgroundColor: "#242020",
  scene: [PreloadScene, GameScene],
};

export class PhaserGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  let game = new PhaserGame(config);
};
