import * as Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload(): void {
    this.load.path = "src/Assets/";
    this.load.image("item", "Items/platformPack_item003.png");
    this.load.image("platform", "Tiles/platformPack_tile001.png");
    this.load.image("obstacle", "/Tiles/platformPack_tile012.png");
    this.load.spritesheet("player", "/Tilesheet/platformerPack_character.png", {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 7,
    });
  }

  create(): void {
    this.anims.create({
      key: "playerRun",
      frames: this.anims.generateFrameNumbers("player", {
        start: 2,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.scene.start("GameScene");
  }
}
