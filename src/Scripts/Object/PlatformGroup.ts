import "phaser";

export default class PlatformGroup extends Phaser.Physics.Arcade.Group {
  constructor(world, scene: Phaser.Scene, x, y) {
    super(world, scene, x, y);
  }
}
