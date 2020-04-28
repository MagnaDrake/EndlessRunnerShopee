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
  }

  create(): void {
    this.scene.start("GameScene");
  }
}
