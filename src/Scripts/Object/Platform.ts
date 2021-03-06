import "phaser";

export default class Platform extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "platform");

    this.scene.add.existing(this);

    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setVelocityX(-75);
  }

  update() {
    if (this.x <= -64) this.x = this.scene.cameras.main.width + 20;
  }
}
