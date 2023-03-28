
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

    private tweenHand: cc.Tween = null;
    private clickTag: string = '';
    private androidLink: string = 'https://play.google.com/store/apps/details?id=com.inwave.tattooasmr.ink.drawing.game&gl=br';
    private iosLink: string = '';
    private defaultLink: string = '';
    private isOpenLink: boolean = false;

    onLoad () {
        GameController.instance = this;
        this.tweenHand = cc.tween(this.hand)
        .repeatForever(
            cc.tween(this.hand)
            .to(0.5, {position: cc.v3(this.violetBtn.position.x + this.violetBtn.width / 2, this.violetBtn.position.y - this.violetBtn.height / 2, 0)})
            .delay(1)
            .to(0.5, {position: cc.v3(this.yellowBtn.position.x + this.yellowBtn.width / 2, this.yellowBtn.position.y - this.yellowBtn.height / 2, 0)})
            .delay(1)
            .to(0.5, {position: cc.v3(this.blueBtn.position.x + this.blueBtn.width / 2, this.blueBtn.position.y - this.blueBtn.height / 2, 0)})
            .delay(1)
        )
    }

    public openAdUrl (): void {
        if (!this.isOpenLink) {
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
}
