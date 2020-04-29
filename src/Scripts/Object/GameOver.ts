import * as Phaser from "phaser";
let reset;
let self;
export default class GameOver extends Phaser.GameObjects.Text {
  private static instance: GameOver;
  constructor(scene: Phaser.Scene) {
    console.log("wat");
    super(scene, 10, 10, "", { color: "red", fontSize: "28px" });
    scene.add.existing(this);
    this.setOrigin(0.5);
    this.setPosition(
      scene.cameras.main.width / 2,
      scene.cameras.main.height / 2
    );
    this.setText("Game Over - Press R to restart");

    reset = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    self = this;

    reset.on("down", function () {
      self.scene.time.timeScale = 1;
      self.scene.physics.resume();
      self.scene.scene.start("GameScene");
    });
  }
  update() {}
}
