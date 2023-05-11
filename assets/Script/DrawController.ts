import GameController from './GameController';
import { SkullCap, Duck, Roblox, Test } from './Waypoint/Index_WayPoint';

const { ccclass, property } = cc._decorator;

@ccclass
export default class DrawController extends cc.Component {
    static instance: DrawController = null;

    @property(cc.Node)
    pen: cc.Node = null;

    @property(cc.Node)
    spritePen: cc.Node = null;

    @property(cc.Node)
    btnX: cc.Node = null;

    @property(cc.Node)
    step1: cc.Node = null;

    @property(cc.Node)
    sprite: cc.Node = null;

    @property(cc.Node)
    graphics: cc.Node = null;

    ctx: cc.Graphics = null;

    private arrWaypoint = Duck[0]

    public indexWaypoint: number = 0;
    private ratio: number = 98;
    public tweenInit1: cc.Tween = null;
    public isAutoDraw: boolean = false;
    public version: number = 3;
    public isStartDraw: boolean = false;
    private tweenBtnX: Function = null;
    private isStartingDraw: boolean = false;
    private indexWayCurrent: number = 1;
    private numWay: number = 4;
    private dataWayPoint: any = [];
    private tweenPen: cc.Tween = null;

    onLoad() {
        DrawController.instance = this;
        const self = this;
        cc.game.on(cc.game.EVENT_HIDE, function () {
            self.pauseGame();
        });

        this.tweenBtnX = () => cc.tween(this.btnX)
        .repeatForever(
            cc.tween(this.btnX)
            .to(0.5, {scale: 1.3})
            .to(0.5, {scale: 1})
        )
        
        this.tweenPen = cc.tween(this.spritePen)
        .repeatForever(
            cc.tween(this.spritePen)
            .to(0.5, {position: cc.v3(0, 10, 0)})
            .to(0.5, {position: cc.v3(0, 0, 0)})
        )

        this.tweenPen.start();

        // For event when the app entering foreground
        cc.game.on(cc.game.EVENT_SHOW, function () {
            self.showGame();
        });

        if (this.version == 2) {
            this.pen.on(cc.Node.EventType.TOUCH_START, this.handleEventTouchStart, this);
            this.pen.on(cc.Node.EventType.TOUCH_MOVE, this.handleEventTouchMove, this);
            this.pen.on(cc.Node.EventType.TOUCH_END, this.handleEventTouchEnd, this);
        }

        if (this.version == 3) {
            this.step1.on(cc.Node.EventType.TOUCH_START, this.handleEventTouchStart, this);
            this.step1.on(cc.Node.EventType.TOUCH_MOVE, this.handleEventTouchMove, this);
            this.step1.on(cc.Node.EventType.TOUCH_END, this.handleEventTouchEnd, this);
        }

        this.startDraw();

        // test 
        this.dataWayPoint = Test;

        this.numWay = this.dataWayPoint.length;
        this.arrWaypoint = this.dataWayPoint[0];
        this.initGraphic(true);
    }

    private pauseGame(): void {

    }

    public setDataCharacter1(): void {
        this.dataWayPoint = Duck;
        this.numWay = Duck.length;
        this.arrWaypoint = this.dataWayPoint[0];
        this.initGraphic(true);
    }

    public setDataCharacter2(): void {
        this.dataWayPoint = SkullCap;
        this.numWay = SkullCap.length;
        this.arrWaypoint = this.dataWayPoint[0];
        this.initGraphic(true);
    }

    public setDataCharacter3(): void {
        this.dataWayPoint = Roblox;
        this.numWay = Roblox.length;
        this.arrWaypoint = this.dataWayPoint[0];
        this.initGraphic(true);

/*         this.dataWayPoint = Test;
        this.numWay = this.dataWayPoint.length;
        this.arrWaypoint = this.dataWayPoint[0];
        console.log(this.arrWaypoint);
        for (let i = 0; i < this.arrWaypoint.length; i++) {
            this.arrWaypoint[i].x *= 99;
            this.arrWaypoint[i].y *= 90;
            this.arrWaypoint[i].x -= 95;
            this.arrWaypoint[i].y -= 145;
        }
        this.initGraphic(true); */
    }

    private showGame(): void {
        console.log("showGame");
        /* if (GameController.instance.isOpenLink && !this.isAutoDraw) {
            this.tweenInit.stop();
            this.clearCtx();
            GameController.instance.tweenTap.stop();
            GameController.instance.nodeTapToPlay.active = false;
            if (this.version == 1) {
                this.autoDraw();
            }
        } */
    }

    private handleEventTouchStart(): void {
        if (!GameController.instance.isSelectedCharacter) return;
        GameController.instance.nodeTapToPlay.active = false;
        this.isStartingDraw = true;
        GameController.instance.tweenHand.stop();
        GameController.instance.playAudioPen();
        if (!this.isStartDraw) {
            this.isStartDraw = true;
            // this.tweenBtnX().start();
            GameController.instance.startDraw();
        }

    }

    handleEventTouchMove2(): void {
        // this.ctx = this.node.getComponent(cc.Graphics);
        // this.ctx.lineWidth = 18;
        // this.ctx.strokeColor = cc.Color.BLACK;
    }

    private handleEventTouchMove(event): void {
        if (this.version == 1) {
            GameController.instance.openAdUrl();
        } else if (this.version === 2) {
            const point = this.node.convertToNodeSpaceAR(event.getLocation());
            this.pen.setPosition(point.x, point.y);
            this.updateDraw(point);
        } 
    }

    private handleEventTouchEnd(): void {
        if (!GameController.instance.isSelectedCharacter) return;
        console.log('end');
        this.isStartingDraw = false;
        GameController.instance.stopAudioPen();
    }

    private startDraw(): void {
        // this.initGraphic();

      /*   const timeDelay = 0.2;
        this.tweenInit1 = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .call(() => {
                        this.ctx.moveTo(this.arrWaypoint[0].x, this.arrWaypoint[0].y);
                        this.ctx.lineTo(this.arrWaypoint[1].x, this.arrWaypoint[1].y);
                        this.ctx.stroke();
                        // this.btnX.setPosition(x0, y0);
                        this.pen.setPosition(this.arrWaypoint[0].x + 125, this.arrWaypoint[0].y + 125);
                    })
                    .delay(timeDelay)
                    .call(() => {
                        this.drawPoint(this.arrWaypoint[2].x, this.arrWaypoint[2].y);
                    })
                    .delay(timeDelay)
                    .call(() => {
                        this.drawPoint(this.arrWaypoint[3].x, this.arrWaypoint[3].y);
                    })
                    .delay(timeDelay)
                    .call(() => {
                        this.drawPoint(this.arrWaypoint[4].x, this.arrWaypoint[4].y);
                    })
                    .delay(timeDelay)
                    .call(() => {
                        this.drawPoint(this.arrWaypoint[5].x, this.arrWaypoint[5].y);
                    })
                    .delay(timeDelay)
                    .call(() => {
                        this.drawPoint(this.arrWaypoint[6].x, this.arrWaypoint[6].y);
                    })
                    .delay(timeDelay)
                    .call(() => {
                        this.clearCtx();
                    })
            )
        this.tweenInit1.start(); */

        // this.autoDraw();
    }

    private initGraphic(init: boolean = false): void {
        if(init) {
            this.graphics.removeAllChildren(true);
        }
        const nodeNew = new cc.Node('graphic');
        this.graphics.addChild(nodeNew);
        nodeNew.addComponent(cc.Graphics);
        this.ctx = nodeNew.getComponent(cc.Graphics);
        this.ctx.lineWidth = 19;
        this.ctx.strokeColor = cc.Color.BLACK;
        const x0: number = this.arrWaypoint[0].x;
        const y0: number = this.arrWaypoint[0].y;
        this.ctx.moveTo(x0, y0);
        this.pen.setPosition(x0 + 125, y0 + 125);
        this.btnX.setPosition(x0, y0);
    }

    public clearCtx(): void {
        const x0: number = this.arrWaypoint[0].x;
        const y0: number = this.arrWaypoint[0].y;
        this.ctx.clear();
        // this.btnX.setPosition(x0, y0);
        this.ctx.moveTo(x0, y0);
        this.pen.setPosition(x0, y0);
    }

    public autoDraw(): void {
        this.isAutoDraw = true;
        for (let i = 1; i < this.arrWaypoint.length; i++) {
            setTimeout(() => {
                const pointNext = this.arrWaypoint[i];

               /*  this.btnX.setPosition(pointNext);
                cc.tween(this.btnX)
                .to(0.05, {position: cc.v3(pointNext.x, pointNext.y, 0)})
                .start(); */
                // this.pen.setPosition(pointNext.x + 125, pointNext.y + 125);
                if (i < this.arrWaypoint.length - 1) {
                    const pointNext2 = this.arrWaypoint[i + 1];
                    cc.tween(this.pen)
                    .to(0.05, {position: cc.v3(pointNext2.x + 125, pointNext2.y + 125, 0)})
                    .start();
                }

                this.ctx.lineTo(pointNext.x, pointNext.y);
                this.ctx.stroke();
                if (i === this.arrWaypoint.length - 1) {
                    this.drawDone();
                }
            }, i * 30);
        }
    }

    private nextWay(): void {
        console.log('next ', this.indexWayCurrent);
        this.indexWaypoint = 0;
        this.arrWaypoint = this.dataWayPoint[this.indexWayCurrent - 1];
        this.initGraphic();
    }

    private drawDone(): void {
        GameController.instance.stopAudioPen();
        GameController.instance.clickBtnDone();
        // this.createFireWork();
        cc.tween(this.node)
            .delay(1)
            .call(() => {
                GameController.instance.activeStep1(false);
                GameController.instance.activeStep2(true);
                GameController.instance.openStore();
            })
            .start();
    }

    private updateDraw(point: cc.Vec2): void {
        if (this.indexWaypoint === this.arrWaypoint.length) {
            if (this.indexWayCurrent < this.numWay) {
                this.indexWayCurrent ++;
                this.nextWay();
            } else {
                this.drawDone();
            }
            return;
        }
        const pointNext = this.arrWaypoint[this.indexWaypoint];
        const distance = this.calDistanceVector2(point.x, point.y, pointNext.x + 125, pointNext.y + 125);
        if (distance > 25) return;
        this.btnX.setPosition(cc.v2(pointNext));
        this.ctx.lineTo(pointNext.x, pointNext.y);
        this.ctx.stroke();
        this.indexWaypoint++;
    }

    private calDistanceVector2(x1, y1, x2, y2): number {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }

    private drawPoint(x, y): void {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        // this.btnX.setPosition(x, y);
        this.pen.setPosition(x + 125, y + 125);
    }

    start() {

    }

    createFireWork (): void {
        // Create a node
        var node = new cc.Node();
        // And add nodes to the scene
        this.step1.addChild(node);
        // And add particle components to Node
        var particleSystem = node.addComponent(cc.ParticleSystem);
        // Next you can particleSystem this object for a series of operations
        // particleSystem.file = this.fireWorkFile;
        // particleSystem.custom = true;
        // particleSystem.duration = 1;
        particleSystem.playOnLoad = true;
        particleSystem.autoRemoveOnFinish = true;
    }

    private updateDraw2(): void {
        if (this.indexWaypoint === this.arrWaypoint.length) {
            if (this.indexWayCurrent < this.numWay) {
                this.indexWayCurrent ++;
                this.nextWay();
            } else {
                this.drawDone();
            }
            return;
        }
        const pointNext = this.arrWaypoint[this.indexWaypoint];
        this.pen.setPosition(pointNext.x + 125, pointNext.y + 125);
        this.ctx.lineTo(pointNext.x, pointNext.y);
        this.ctx.stroke();
        this.indexWaypoint++;
    }

    update (dt) {
        if (this.isStartingDraw && GameController.instance.isSelectedCharacter) {
            this.updateDraw2();
        }
    }
}
