import "phaser";
import Background from "../Object/Background";
let scrollSpeed;

export default class BackgroundManager extends Phaser.Physics.Arcade.Group {
  private err: BackgroundManager;
  constructor(world, scene, config, speed: number) {
    super(world, scene, config);
    scene.add.existing(this);

    scrollSpeed = speed;
  }

  update(): void {}

  addBackground(bm: BackgroundManager): boolean {
    //console.log("im genario, delay 3000");
    let floor = bm.scene.cameras.main.height / 2;
    let spawnHeight = Math.random() * (+floor - +floor - 200) + +floor - 200;
    //let height = Math.random() < 0.5 ? windowHeight - 256 : windowHeight - 320;
    let background = bm.get(bm.scene.cameras.main.width, spawnHeight);

    if (!background) return false;

    this.activateBackground(background);
    return true;
  }

  activateBackground(background: Background) {
    background.setActive(true).setVisible(true);
    background.setVelocityX(-scrollSpeed);
  }
}
