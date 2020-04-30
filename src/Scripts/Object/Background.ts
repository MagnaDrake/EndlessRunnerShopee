import "phaser";

export default class Platform extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);

    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setDepth(-5);
    this.setVelocityX(-100);
  }

  update() {
    if (this.x <= -1023) this.x = this.scene.cameras.main.width + 1023;
  }
}
