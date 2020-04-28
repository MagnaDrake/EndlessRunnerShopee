import "phaser";
import Obstacle from "../Object/Obstacle";

export default class ObstacleManager extends Phaser.Physics.Arcade.Group {
  private err: ObstacleManager;
  constructor(world, scene, config) {
    super(world, scene, config);
    this.scene.add.existing(this);
  }

  update(): void {}

  addObstacle(om: ObstacleManager): boolean {
    console.log("im genario, delay 3000");
    let height = Math.random() < 0.5 ? 100 : 200;
    let obstacle = om.get(om.scene.cameras.main.width, height);

    if (!obstacle) return false;

    this.activateObstacle(obstacle);
    return true;
  }

  activateObstacle(obstacle: Obstacle) {
    obstacle.setActive(true).setVisible(true);
    obstacle.setVelocityX(-100);
  }
}
