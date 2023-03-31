import DrawController from './DrawController';

const {ccclass, property} = cc._decorator;

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

    @property(cc.Label)
    color: cc.Label = null;

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
    nodeTapToPlay: cc.Node = null;

    private tweenHand: cc.Tween = null;
    private clickTag: string = '';
    private androidLink: string = 'https://play.google.com/store/apps/details?id=com.inwave.tattooasmr.ink.drawing.game&gl=br';
    private iosLink: string = '';
    private defaultLink: string = '';
    public isOpenLink: boolean = false;
    public tweenTap: cc.Tween = null;
    onLoad () {
        GameController.instance = this;
        // this.playAudioBg();
        this.tweenTap = cc.tween(this.nodeTapToPlay)
        .repeatForever(
            cc.tween(this.nodeTapToPlay)
            .to(0.4, {opacity: 0})
            .to(0.4, {opacity: 255})
        )
        this.tweenTap.start();

        this.tweenHand = cc.tween(this.hand)
        .repeatForever(
            cc.tween(this.hand)
            .to(0.5, {position: cc.v3(this.violetBtn.position.x, this.violetBtn.position.y - this.violetBtn.height / 2, 0)})
            .call(() => {
                this.color.string = "Violet";
            })
            .delay(1)
            .to(0.5, {position: cc.v3(this.yellowBtn.position.x, this.yellowBtn.position.y - this.yellowBtn.height / 2, 0)})
            .call(() => {
                this.color.string = "Yellow";
            })
            .delay(1)
            .to(0.5, {position: cc.v3(this.blueBtn.position.x, this.blueBtn.position.y - this.blueBtn.height / 2, 0)})
            .call(() => {
                this.color.string = "Blue";
            })
            .delay(1)
        )
        this.tweenHand.start();
    }

    public openAdUrl (): void {
        console.log('openurl');
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
    
            if(window.openStore) {
                window.openStore(this.clickTag);
            } else {
                window.open(this.clickTag);
            }
        } else if (this.isOpenLink && !DrawController.instance.isAutoDraw) {
            this.playAudioPen();
            this.stopAudioBg();
            DrawController.instance.tweenInit.stop();
            DrawController.instance.clearCtx();
            this.tweenTap.stop();
            this.nodeTapToPlay.active = false;
            if (DrawController.instance.version == 1) {
                DrawController.instance.autoDraw();
            }
        }
    }

    private activeStep1(value: boolean): void {
        this.step1.active = value;
    }

    public activeStep2(value: boolean): void {
        this.isOpenLink = false;
        this.step2.active = value;
        this.tweenHand.start();
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
        this.audio.clip = this.audioPen;
        this.audio.loop = true;
        this.audio.play();
    }

    public stopAudioPen(): void {
        this.audio.loop = false;
        this.audio.stop();
    }

    public playAudioBg(): void {
        this.audioBg.loop = true;
        this.audioBg.play();
    }

    public stopAudioBg(): void {
        this.audioBg.loop = false;
        this.audioBg.stop();
    }
}
