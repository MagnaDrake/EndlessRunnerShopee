import "phaser";
let xThreshold;
let jumpButton;
let crouchButton;
let self;
let isJumping;
let isCrouching;
let jumpAudio;
let dieAudio;
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
    this.setSize(50, 64);
    this.body.offset.y = 30;

    this.anims.play("playerRun");

    jumpAudio = this.scene.game.sound.add("jump");
    dieAudio = this.scene.game.sound.add("death");

    //this.setImmovable(true);
    jumpButton = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );

    crouchButton = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    jumpButton.on("down", function () {
      if (!isJumping && !isCrouching) {
        self.setVelocity(0, -300);
        self.anims.play("playerJump");
        //self.anims.stop();
        jumpAudio.play();
      }
    });

    crouchButton.on("down", function () {
      if (!isCrouching && !isJumping) {
        //console.log("crouch");
        isCrouching = true;
        //console.log(isCrouching);
        //self.setOrigin(0, 1);
        self.setVelocity(0, -100);
        //console.log("crouch size");
        self.body.setSize(50, 50);
        self.body.offset.y = 50;
        self.anims.play("playerCrouch");
        self.on(
          Phaser.Animations.Events.SPRITE_ANIMATION_KEY_COMPLETE +
            "playerCrouch",
          () => {
            self.stand();
            isCrouching = false;
          }
        );

        //self.y += 50;
      }
    });

    this.on("pointerdown", function () {
      if (isJumping === false) {
        this.setVelocity(0, -300);
        //console.log("click!");
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

  stand(): void {
    //console.log("check stand");
    //console.log(isCrouching);
    if (!self.anims.isPlaying && !isCrouching) {
      console.log("stand size");
      self.setSize(50, 64);
      self.body.offset.y = 30;
      self.anims.play("playerRun");
      //console.log("stand once please");
    }
  }

  gameover(): void {
    dieAudio.play();
    self.scene.time.timeScale = 0;
    //this.scene.physics.world.timeScale = 0;
    self.scene.physics.pause();
  }
}
