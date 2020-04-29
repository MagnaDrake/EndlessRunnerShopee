import "phaser";
let xThreshold;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "item");

    this.scene.add.existing(this);

    xThreshold = x;

    scene.physics.add.existing(this);

    this.setInteractive();

    this.setCollideWorldBounds();
    //this.setBounce(0.6);

    this.setGravity(0, 400);

    //this.setImmovable(true);

    this.on("pointerdown", function () {
      this.setVelocity(0, -300);
      console.log("click!");
    });
  }

  update() {
    this.x = xThreshold;
  }
}
