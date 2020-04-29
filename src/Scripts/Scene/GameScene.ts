import * as Phaser from "phaser";
import Player from "../Object/Player";
import Platform from "../Object/Platform";
import Obstacle from "../Object/Obstacle";
import ObstacleManager from "../Object/ObstacleManager";

export default class GameScene extends Phaser.Scene {
  private player: Player;
  private obstacleManager: ObstacleManager;
  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {}

  create(): void {
    this.player = new Player(this, 64, this.cameras.main.height / 2);
    let PlatformGroup = this.add.group({
      runChildUpdate: true,
    });
    PlatformGroup.createMultiple({
      classType: Platform,
      key: "platform",
      repeat: 25,
    });
    Phaser.Actions.SetXY(
      PlatformGroup.getChildren(),
      0,
      this.cameras.main.height - 200,
      64
    );
    this.physics.add.collider(this.player, PlatformGroup, this.player.stand);

    this.obstacleManager = new ObstacleManager(this.physics.world, this, {
      classType: Obstacle,
      defaultKey: "obstacle",
      maxSize: 10,
      runChildUpdate: true,
    });

    this.time.addEvent({
      delay: 4500,
      loop: true,
      callback: () => {
        this.obstacleManager.addObstacle(this.obstacleManager);
      },
    });

    this.physics.add.overlap(this.player, this.obstacleManager);
  }

  update(): void {
    this.player.update();
    this.obstacleManager.update();
  }
}
