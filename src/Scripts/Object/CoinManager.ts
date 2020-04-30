import "phaser";
import Coin from "../Object/Coin";
const spawnChance = 1000;
export default class CoinManager extends Phaser.Physics.Arcade.Group {
  //private err: ObstacleManager;
  constructor(world, scene, config) {
    super(world, scene, config);
    this.scene.add.existing(this);
  }

  update(): void {}

  addCoin(cm: CoinManager): boolean {
    let spawnThreshold = Math.floor(Math.random() * 100) + 1;

    if (spawnThreshold < spawnChance) {
      let windowHeight = cm.scene.cameras.main.height;
      let height = windowHeight - 360;
      let coin = cm.get(cm.scene.cameras.main.width, height);

      if (!cm) return false;

      this.activateCoin(coin);
      return true;
    }
    return false;
  }

  activateCoin(coin: Coin) {
    coin.setActive(true).setVisible(true);
    coin.setVelocityX(-100);
    coin.body.checkCollision.none = false;
  }
}
