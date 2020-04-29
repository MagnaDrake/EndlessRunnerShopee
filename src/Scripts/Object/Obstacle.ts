import "phaser";

export default class Obstacle extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);

    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setVelocityX(-200);
    this.setSize(25, 50);
    //console.log("i'm born");
  }

  update() {
    if (this.x < -100) this.setActive(false);
    //console.log(this.x);
    if (!this.body.touching.none) {
      this.scene.scene.start("GameScene");
    }
  }
}
