import * as Phaser from "phaser";

export default class ScoreManager extends Phaser.GameObjects.Text {
  private score: integer;
  constructor(scene: Phaser.Scene) {
    super(scene, 10, 10, "", { color: "white", fontSize: "28px" });
    scene.add.existing(this);
    this.setOrigin(0);
    this.score = 0;
    this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.addScore(100);
      },
    });
  }

  update() {
    //this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)
    this.setText(this.score.toString());
    //console.log(this.score);
  }

  addScore(score: number): void {
    this.score += score;
  }

  setScore(score: number): void {}
}
