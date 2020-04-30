import * as Phaser from "phaser";
import Player from "../Object/Player";
import Platform from "../Object/Platform";
import Obstacle from "../Object/Obstacle";
import ObstacleManager from "../Object/ObstacleManager";
import Background from "../Object/Background";
import BackgroundManager from "../Object/BackgroundManager";
import ScoreManager from "../Object/ScoreManager";
import Coin from "../Object/Coin";
import CoinManager from "../Object/CoinManager";
import GameOver from "../Object/GameOver";

export default class GameScene extends Phaser.Scene {
  private player: Player;
  private obstacleManager: ObstacleManager;
  private BackgroundGroup;
  private background2: BackgroundManager;
  private scoreManager: ScoreManager;
  public gameOverText: GameOver;
  private coinManager: CoinManager;
  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {}

  create(): void {
    this.player = new Player(this, 64, this.cameras.main.height / 2);

    this.background2 = new BackgroundManager(
      this.physics.world,
      this,
      {
        classType: Background,
        defaultKey: "cloud",
        maxSize: 30,
        runChildUpdate: true,
      },
      20 //scroll speed
    );

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

    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        this.background2.addBackground(this.background2);
      },
    });

    this.coinManager = new CoinManager(this.physics.world, this, {
      classType: Coin,
      defaultKey: "item",
      maxSize: 10,
      runChildUpdate: true,
    });

    this.physics.add.overlap(this.coinManager, this.player, () => {
      this.scoreManager.addScore(100);
    });

    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        this.coinManager.addCoin(this.coinManager);
      },
    });

    this.physics.add.overlap(this.player, this.obstacleManager, () => {
      this.showGameOver(this.gameOverText);
      this.player.gameover();
    });

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

    this.BackgroundGroup = this.add.group({ runChildUpdate: true });

    this.BackgroundGroup.createMultiple({
      classType: Background,
      key: "bg1",
      frameQuantity: 4,
    });

    Phaser.Actions.SetXY(
      this.BackgroundGroup.getChildren(),
      0,
      this.cameras.main.height / 2,
      1024
    );
    Phaser.Actions.SetDepth(this.BackgroundGroup.getChildren(), -6);
    //haser.Actions.SetVisible(this.BackgroundGroup.getChildren(), false);

    this.physics.add.collider(this.player, PlatformGroup, this.player.stand);

    this.scoreManager = new ScoreManager(this);

    this.gameOverText = new GameOver(this);
    this.gameOverText.setVisible(false);
    this.gameOverText.setDepth(4);
  }

  update(): void {
    this.player.update();
    this.obstacleManager.update();
    this.scoreManager.update();
    this.gameOverText.update();

    //Phaser.Actions.IncX(this.BackgroundGroup.getChildren, -200);
    //this.BackgroundGroup.children.iterate
  }

  showGameOver(gt): void {
    gt.setVisible(true);
  }
}
