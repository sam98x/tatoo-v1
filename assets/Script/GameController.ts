
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    private clickTag: string = '';
    private androidLink: string = 'https://play.google.com/store/apps/details?id=com.inwave.tattooasmr.ink.drawing.game&gl=br';
    private iosLink: string = '';
    private defaultLink: string = '';
    private adNetWork: string = 'ironsource';

    onLoad () {
        
        // this.node.on(cc.Node.EventType.TOUCH_START, this.handleEventTouchStart, this);
    }

    start () {

    }

    private handleEventTouchStart(): void {
        console.log('touch start');
        this.openAdUrl();
    }

    // update (dt) {}

    private openAdUrl (): void {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this.clickTag = this.androidLink;
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            this.clickTag = this.iosLink;
        } else {
            this.clickTag = this.defaultLink;
        }

        /* switch(this.adNetWork) {
            case 'adword': {
                window.open(this.clickTag);
                break;
            }
            case 'applovin': {
                mraid.open(this.clickTag);
                break;
            }
            case 'facebook': {
                // FbPlayableAd.onCTAClick();
                break;
            }
            case 'ironsource': {
                dapi.openStoreUrl(this.clickTag);
                break;
            }
            case 'unity': {
                mraid.open(this.clickTag);
                break;
            }
            case 'vungle': {
                // callSDK('download');
                break;
            }
            default: {
                window.open(this.clickTag);
            }
        } */
        window.openStore();
    }
}
