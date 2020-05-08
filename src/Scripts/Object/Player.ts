import "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private xThreshold;
  private jumpButton;
  private crouchButton;
  private self;
  private isJumping;
  private isCrouching;
  private jumpAudio;
  private dieAudio;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    this.scene.add.existing(this);

    this.xThreshold = x;
    //self = this;

    scene.physics.add.existing(this);

    this.setInteractive();

    this.setCollideWorldBounds();
    //this.setBounce(0.6);

    this.setGravity(0, 400);
    //this.setOrigin(1);
    this.setSize(50, 64);
    this.body.offset.y = 30;

    this.anims.play("playerRun");

    this.jumpAudio = this.scene.game.sound.add("jump");
    this.dieAudio = this.scene.game.sound.add("death");

    //this.setImmovable(true);
    this.jumpButton = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );

    this.crouchButton = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.stand();
    this.jumpButton.on("down", () => {
      if (!this.isJumping && !this.isCrouching) {
        this.setVelocity(0, -400);
        this.anims.play("playerJump");
        //this.anims.stop();
        this.jumpAudio.play();
      }
    });

    this.crouchButton.on("down", () => {
      if (!this.isCrouching && !this.isJumping) {
        this.isCrouching = true;
        this.setVelocity(0, -100);
        this.body.setSize(50, 50);
        this.body.offset.y = 50;
        this.anims.play("playerCrouch");
        console.log(this);
        this.on(
          Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE +
            "playerCrouch",
          () => {
            console.log("stand post crouch");
            console.log(this);
            this.isCrouching = false;
            this.stand();
          }
        );
      }
    });

    this.on("pointerdown", () => {
      if (this.isJumping === false) {
        this.setVelocity(0, -300);
      }
    });
  }

  update() {
    this.x = this.xThreshold;
    if (this.body.touching.none) {
      this.isJumping = true;
    } else {
      this.isJumping = false;
    }
  }

  stand(): void {
    if (!this.anims.isPlaying && !this.isCrouching) {
      this.setSize(50, 64);
      this.body.offset.y = 30;
      this.anims.play("playerRun");
    }
  }

  gameover(): void {
    this.dieAudio.play();
    this.scene.time.timeScale = 0;
    this.scene.physics.pause();
  }
}
