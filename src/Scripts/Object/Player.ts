import "phaser";
let xThreshold;
let jumpButton;
let crouchButton;
let self;
let isJumping;
let isCrouching;
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    this.scene.add.existing(this);

    xThreshold = x;
    self = this;

    scene.physics.add.existing(this);

    this.setInteractive();

    this.setCollideWorldBounds();
    //this.setBounce(0.6);

    this.setGravity(0, 400);
    //this.setOrigin(1);
    this.setSize(50, 90);

    this.anims.play("playerRun");

    //this.setImmovable(true);
    jumpButton = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );

    crouchButton = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    jumpButton.on("down", function () {
      if (!isJumping) {
        self.setVelocity(0, -300);
        console.log("click!");
      }
    });

    crouchButton.on("down", function () {
      if (!isCrouching) {
        //self.setOrigin(0, 1);
        self.setSize(50, 50);
      }
    });

    this.on("pointerdown", function () {
      if (isJumping === false) {
        this.setVelocity(0, -300);
        console.log("click!");
      }
    });
  }

  update() {
    this.x = xThreshold;
    if (this.body.touching.none) {
      isJumping = true;
    } else {
      isJumping = false;
    }
  }
}
