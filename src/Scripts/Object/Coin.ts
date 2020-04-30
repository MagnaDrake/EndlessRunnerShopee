import "phaser";
let coinAudio;

export default class Coin extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);

    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setVelocityX(-200);
    this.setSize(25, 50);

    coinAudio = this.scene.game.sound.add("coinGet");
  }

  update() {
    if (this.x < -100) this.setActive(false);
    if (!this.body.touching.none) {
      coinAudio.play();
      this.body.checkCollision.none = true;
      this.setActive(false).setVisible(false);
    }
  }
}
