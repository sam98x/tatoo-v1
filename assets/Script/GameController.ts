import DrawController from './DrawController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    static instance: GameController = null;

    @property(cc.Node)
    step1: cc.Node = null;

    @property(cc.Node)
    step2: cc.Node = null;

    @property(cc.Node)
    hand: cc.Node = null;

    @property(cc.Node)
    violetBtn: cc.Node = null;

    @property(cc.Node)
    yellowBtn: cc.Node = null;

    @property(cc.Node)
    blueBtn: cc.Node = null;

    // @property(cc.Label)
    // color: cc.Label = null;

    @property(cc.AudioSource)
    audio: cc.AudioSource = null;

    @property(cc.AudioClip)
    audioBtn: cc.AudioClip = null;

    @property(cc.AudioClip)
    audioChooseColor: cc.AudioClip = null;

    @property(cc.AudioClip)
    audioDone: cc.AudioClip = null;

    @property(cc.AudioClip)
    audioPen: cc.AudioClip = null;

    @property(cc.AudioSource)
    audioBg: cc.AudioSource = null;

    @property(cc.Node)
    mode: cc.Node = null;

    @property([cc.SpriteFrame])
    arrCharacter: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    character: cc.Sprite = null;

    @property(cc.Node)
    btnClickStep2: cc.Node = null;

    @property(cc.Node)
    nodeTapToPlay: cc.Node = null;

    public tweenHand: cc.Tween = null;
    private clickTag: string = 'https://play.google.com/store/apps/details?id=com.inwave.tattooasmr.ink.drawing.game';
    private androidLink: string = 'https://play.google.com/store/apps/details?id=com.inwave.tattooasmr.ink.drawing.game';
    private iosLink: string = 'https://play.google.com/store/apps/details?id=com.inwave.tattooasmr.ink.drawing.game';
    private defaultLink: string = 'https://play.google.com/store/apps/details?id=com.inwave.tattooasmr.ink.drawing.game';
    public isOpenLink: boolean = false;
    public tweenTap: cc.Tween = null;
    public isPlayAudioPen: boolean = false;
    public isSelectedCharacter: boolean = false;
    public tweenBtnStep2: cc.Tween = null;
    private tweenScale: Function = null;

    onLoad() {
        GameController.instance = this;
        // this.playAudioBg();

        this.tweenTap = cc.tween(this.nodeTapToPlay)
            .repeatForever(
                cc.tween(this.nodeTapToPlay)
                    .to(0.4, { opacity: 0 })
                    .to(0.4, { opacity: 255 })
            )
        console.log(this.violetBtn.width)
        this.tweenScale = (node: cc.Node, scale: number) => cc.tween(node)
                            .to(0.1, {scale: scale});

        this.hand.setPosition(this.violetBtn.position.x, this.mode.y);
        this.tweenHand = cc.tween(this.hand)
            .repeatForever(
                cc.tween(this.hand)
                    .to(0.5, { position: cc.v3(this.violetBtn.position.x + 50, this.mode.y, 0) })
                    .call(() => {
                        this.tweenScale(this.violetBtn.children[0], 1.2).start();
                        this.tweenScale(this.yellowBtn.children[0], 1).start();
                        this.tweenScale(this.blueBtn.children[0], 1).start();

                        this.character.spriteFrame = this.arrCharacter[0];
                        DrawController.instance.setDataCharacter1();
                    })
                    .delay(1)
                    .to(0.5, { position: cc.v3(this.yellowBtn.position.x + 50, this.mode.y, 0) })
                    .call(() => {
                        this.tweenScale(this.violetBtn.children[0], 1).start();
                        this.tweenScale(this.yellowBtn.children[0], 1.2).start();
                        this.tweenScale(this.blueBtn.children[0], 1).start();

                        this.character.spriteFrame = this.arrCharacter[1];
                        DrawController.instance.setDataCharacter2();
                    })
                    .delay(1)
                    .to(0.5, { position: cc.v3(this.blueBtn.position.x + 50, this.mode.y, 0) })
                    .call(() => {
                        this.tweenScale(this.violetBtn.children[0], 1).start();
                        this.tweenScale(this.yellowBtn.children[0], 1).start();
                        this.tweenScale(this.blueBtn.children[0], 1.2).start();

                        this.character.spriteFrame = this.arrCharacter[2];
                        DrawController.instance.setDataCharacter3();
                    })
                    .delay(1)
            )

        this.tweenHand.start();

        this.tweenBtnStep2 = cc.tween(this.btnClickStep2)
                                .repeatForever(
                                    cc.tween(this.btnClickStep2)
                                        .to(0.5, {scale: 1.1})
                                        .to(0.5, {scale: 1})
                                )
    }

    public openAdUrl(): void {
        if (!this.isOpenLink || this.step2.active) {
            this.clickBtnPlay();
            this.isOpenLink = true;
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                this.clickTag = this.androidLink;
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                this.clickTag = this.iosLink;
            } else {
                this.clickTag = this.defaultLink;
            }
            this.openStore();
        } else if (this.isOpenLink && !DrawController.instance.isAutoDraw && DrawController.instance.version === 1) {
            this.startDraw();
            if (DrawController.instance.version == 1) {
                DrawController.instance.autoDraw();
            }
        }
    }

    public openStore(): void {
        if (window.openStore) {
            window.openStore();
        } else {
            window.open(this.clickTag);
        }
    }

    public startDraw(): void {
        this.playAudioBg();
        this.downVolumnBg();

        // DrawController.instance.tweenInit1.stop();

        // DrawController.instance.clearCtx();

        // this.tweenTap.stop();
        // this.nodeTapToPlay.active = false;
    }

    public activeStep1(value: boolean): void {
        this.step1.active = value;
    }

    public activeStep2(value: boolean): void {
        this.isOpenLink = false;
        this.step2.active = value;
        // this.tweenHand.start();
        this.tweenBtnStep2.start();

    }

    public clickBtnPlay(): void {
        this.audio.clip = this.audioBtn;
        this.audio.play();
    }

    public clickBtnChoose(): void {
        this.audio.clip = this.audioChooseColor;
        this.audio.play();
    }

    public clickBtnDone(): void {
        this.audio.clip = this.audioDone;
        this.audio.play();
    }

    public playAudioPen(): void {
        if (!this.isPlayAudioPen) {
            this.isPlayAudioPen = true;
            this.audio.clip = this.audioPen;
            this.audio.loop = true;
            this.audio.play();
        };
    }

    public stopAudioPen(): void {
        if (this.isPlayAudioPen) {
            this.isPlayAudioPen = false;
            this.audio.loop = false;
            this.audio.stop();
        };
    }

    public playAudioBg(): void {
        this.audioBg.loop = true;
        this.audioBg.play();
    }

    public stopAudioBg(): void {
        this.audioBg.loop = false;
        this.audioBg.stop();
    }

    public downVolumnBg(): void {
        this.audioBg.volume = 0.8;
    }

    public clickBtnSelectCharacter(event, customEventData): void {
        if (DrawController.instance.indexWaypoint > 0) return;
        this.isSelectedCharacter = true;
        this.nodeTapToPlay.active = true;
        this.hand.active = false;
        this.tweenTap.start();
        this.tweenHand.stop();
        switch(customEventData){
            case '0': {
                this.tweenScale(this.violetBtn.children[0], 1.2).start();
                this.tweenScale(this.yellowBtn.children[0], 1).start();
                this.tweenScale(this.blueBtn.children[0], 1).start();

                this.character.spriteFrame = this.arrCharacter[0];
                DrawController.instance.setDataCharacter1();
                this.hand.setPosition(cc.v3(this.violetBtn.position.x, this.mode.y, 0));
                break;
            }
            case '1': {
                this.tweenScale(this.violetBtn.children[0], 1).start();
                this.tweenScale(this.yellowBtn.children[0], 1.2).start();
                this.tweenScale(this.blueBtn.children[0], 1).start();

                this.character.spriteFrame = this.arrCharacter[1];
                DrawController.instance.setDataCharacter2();
                this.hand.setPosition(cc.v3(this.yellowBtn.position.x, this.mode.y, 0));
                break;
            }
            case '2': {
                this.tweenScale(this.violetBtn.children[0], 1).start();
                this.tweenScale(this.yellowBtn.children[0], 1).start();
                this.tweenScale(this.blueBtn.children[0], 1.2).start();

                this.character.spriteFrame = this.arrCharacter[2];
                DrawController.instance.setDataCharacter3();
                this.hand.setPosition(cc.v3(this.blueBtn.position.x, this.mode.y, 0));
                break;
            }
        }
    }
}
