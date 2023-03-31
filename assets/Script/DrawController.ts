import GameController from './GameController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class DrawController extends cc.Component {
    static instance: DrawController = null;

    @property(cc.Node)
    pen: cc.Node = null;

    @property(cc.Node)
    btnX: cc.Node = null;

    @property(cc.Node)
    step1: cc.Node = null;

    ctx: cc.Graphics = null;
    private arrWaypoint2 = [
        cc.v2(-0.20, 0.180),
        cc.v2(-0.42, 0.340),
        cc.v2(-0.57, 0.520),
        cc.v2(-0.66, 0.700),
        cc.v2(-0.71, 0.880),
        cc.v2(-0.72, 1.060),
        cc.v2(-0.71, 1.230),
        cc.v2(-0.69, 1.380),
        cc.v2(-0.65, 1.520),
        cc.v2(-0.63, 1.640),
        cc.v2(-0.80, 1.850),
        cc.v2(-0.85, 2.010),
        cc.v2(-0.83, 2.120),
        cc.v2(-0.76, 2.160),
        cc.v2(-0.61, 2.110),
        cc.v2(-0.43, 2.060),
        cc.v2(-0.24, 2.210),
        cc.v2(-0.04, 2.330),
        cc.v2(0.15, 2.410),
        cc.v2(0.35, 2.460),
        cc.v2(0.55, 2.490),
        cc.v2(0.75, 2.480),
        cc.v2(0.93, 2.440),
        cc.v2(1.11, 2.380),
        cc.v2(1.28, 2.300),
        cc.v2(1.44, 2.190),
        cc.v2(1.58, 2.050),
        cc.v2(1.70, 1.900),
        cc.v2(1.80, 1.730),
        cc.v2(1.88, 1.540),
        cc.v2(1.94, 1.330),
        cc.v2(2.03, 1.180),
        cc.v2(2.18, 1.130),
        cc.v2(2.35, 1.120),
        cc.v2(2.52, 1.140),
        cc.v2(2.68, 1.130),
        cc.v2(2.74, 1.020),
        cc.v2(2.75, 0.880),
        cc.v2(2.69, 0.750),
        cc.v2(2.59, 0.620),
        cc.v2(2.44, 0.500),
        cc.v2(2.26, 0.400),
        cc.v2(2.05, 0.320),
        cc.v2(1.82, 0.280),
        cc.v2(1.57, 0.290),
        cc.v2(1.52, 0.170),
        cc.v2(1.62, 0.030),
        cc.v2(1.76, -0.100),
        cc.v2(1.85, -0.200),
        cc.v2(1.97, -0.360),
        cc.v2(2.07, -0.530),
        cc.v2(2.14, -0.700),
        cc.v2(2.19, -0.880),
        cc.v2(2.21, -1.050),
        cc.v2(2.20, -1.220),
        cc.v2(2.17, -1.390),
        cc.v2(2.12, -1.550),
        cc.v2(2.03, -1.710),
        cc.v2(1.92, -1.850),
        cc.v2(1.79, -1.990),
        cc.v2(1.63, -2.110),
        cc.v2(1.44, -2.220),
        cc.v2(1.22, -2.320),
        cc.v2(0.98, -2.390),
        cc.v2(0.71, -2.450),
        cc.v2(0.41, -2.480),
        cc.v2(0.08, -2.500),
        cc.v2(-0.27, -2.490),
        cc.v2(-0.52, -2.490),
        cc.v2(-0.76, -2.470),
        cc.v2(-0.98, -2.430),
        cc.v2(-1.18, -2.370),
        cc.v2(-1.36, -2.300),
        cc.v2(-1.53, -2.200),
        cc.v2(-1.69, -2.090),
        cc.v2(-1.83, -1.970),
        cc.v2(-1.95, -1.820),
        cc.v2(-2.06, -1.670),
        cc.v2(-2.16, -1.500),
        cc.v2(-2.24, -1.330),
        cc.v2(-2.31, -1.140),
        cc.v2(-2.37, -0.940),
        cc.v2(-2.41, -0.740),
        cc.v2(-2.45, -0.520),
        cc.v2(-2.47, -0.300),
        cc.v2(-2.48, -0.080),
        cc.v2(-2.48, 0.150),
        cc.v2(-2.34, 0.130),
        cc.v2(-2.18, 0.020),
        cc.v2(-2.01, -0.110),
        cc.v2(-1.83, -0.220),
        cc.v2(-1.65, -0.250),
        cc.v2(-1.51, -0.180),
        cc.v2(-1.35, -0.120),
        cc.v2(-1.18, -0.060),
        cc.v2(-1.00, 0.000),
        cc.v2(-0.81, 0.050),
        cc.v2(-0.62, 0.100),
        cc.v2(-0.42, 0.140),
        cc.v2(-0.23, 0.170)
    ];

    private arrWaypoint = [
        cc.v2(-0.24, 0.19),cc.v2(-0.30, 0.23),
        cc.v2(-0.36, 0.27),cc.v2(-0.42, 0.32), cc.v2(-0.47, 0.36), 
        cc.v2(-0.51, 0.41), cc.v2(-0.55, 0.47), cc.v2(-0.59, 0.52), 
        cc.v2(-0.62, 0.57), cc.v2(-0.64, 0.63), cc.v2(-0.67, 0.69), 
        cc.v2(-0.69, 0.75), cc.v2(-0.70, 0.81), cc.v2(-0.71, 0.88), 
        cc.v2(-0.72, 0.94), cc.v2(-0.73, 1.01), cc.v2(-0.73, 1.07), 
        cc.v2(-0.72, 1.14), cc.v2(-0.72, 1.21), cc.v2(-0.71, 1.28), 
        cc.v2(-0.70, 1.35), cc.v2(-0.69, 1.42), cc.v2(-0.67, 1.49), 
        cc.v2(-0.65, 1.56), cc.v2(-0.66, 1.66), cc.v2(-0.70, 1.71), 
        cc.v2(-0.74, 1.75), cc.v2(-0.78, 1.80), cc.v2(-0.82, 1.86), 
        cc.v2(-0.84, 1.92), cc.v2(-0.86, 1.98), cc.v2(-0.86, 2.05), 
        cc.v2(-0.84, 2.11), cc.v2(-0.77, 2.16), cc.v2(-0.72, 2.14), 
        cc.v2(-0.65, 2.12), cc.v2(-0.58, 2.10), cc.v2(-0.51, 2.08), 
        cc.v2(-0.45, 2.07), cc.v2(-0.37, 2.13), cc.v2(-0.30, 2.18), 
        cc.v2(-0.22, 2.23), cc.v2(-0.15, 2.28), cc.v2(-0.07, 2.32), 
        cc.v2(0.00, 2.36), cc.v2(0.07, 2.39), cc.v2(0.15, 2.42), cc.v2(0.22, 2.44), 
        cc.v2(0.29, 2.46), cc.v2(0.36, 2.48), cc.v2(0.43, 2.49), cc.v2(0.50, 2.50), 
        cc.v2(0.57, 2.50), cc.v2(0.64, 2.50), cc.v2(0.71, 2.50), cc.v2(0.77, 2.49), 
        cc.v2(0.84, 2.48), cc.v2(0.90, 2.47), cc.v2(0.96, 2.45), cc.v2(1.02, 2.43), 
        cc.v2(1.08, 2.41), cc.v2(1.14, 2.39), cc.v2(1.20, 2.36), cc.v2(1.25, 2.33), 
        cc.v2(1.31, 2.30), cc.v2(1.36, 2.26), cc.v2(1.41, 2.22), cc.v2(1.46, 2.18), 
        cc.v2(1.50, 2.14), cc.v2(1.55, 2.10), cc.v2(1.59, 2.05), cc.v2(1.63, 2.00), 
        cc.v2(1.67, 1.95), cc.v2(1.70, 1.90), cc.v2(1.74, 1.85), cc.v2(1.77, 1.80), 
        cc.v2(1.79, 1.74), cc.v2(1.82, 1.68), cc.v2(1.84, 1.62), cc.v2(1.86, 1.56), 
        cc.v2(1.90, 1.41), cc.v2(1.94, 1.33), cc.v2(1.98, 1.27), cc.v2(2.03, 1.22), 
        cc.v2(2.08, 1.18), cc.v2(2.14, 1.16), cc.v2(2.20, 1.14), cc.v2(2.26, 1.13), 
        cc.v2(2.33, 1.12), cc.v2(2.39, 1.12), cc.v2(2.45, 1.13), cc.v2(2.51, 1.13), 
        cc.v2(2.57, 1.13), cc.v2(2.62, 1.13), cc.v2(2.66, 1.12), cc.v2(2.69, 1.11), 
        cc.v2(2.71, 1.09), cc.v2(2.73, 1.01), cc.v2(2.73, 0.93), cc.v2(2.72, 0.86), 
        cc.v2(2.70, 0.80), cc.v2(2.68, 0.73), cc.v2(2.64, 0.68), cc.v2(2.60, 0.63), 
        cc.v2(2.56, 0.58), cc.v2(2.51, 0.53), cc.v2(2.45, 0.49), cc.v2(2.39, 0.46), 
        cc.v2(2.33, 0.43), cc.v2(2.27, 0.40), cc.v2(2.20, 0.37), cc.v2(2.13, 0.35), 
        cc.v2(2.06, 0.33), cc.v2(1.99, 0.32), cc.v2(1.93, 0.31), cc.v2(1.86, 0.30), 
        cc.v2(1.80, 0.29), cc.v2(1.74, 0.29), cc.v2(1.68, 0.29), cc.v2(1.63, 0.29), 
        cc.v2(1.58, 0.29), cc.v2(1.52, 0.25), cc.v2(1.51, 0.20), cc.v2(1.52, 0.15), 
        cc.v2(1.54, 0.11), cc.v2(1.56, 0.06), cc.v2(1.60, 0.01), cc.v2(1.64, -0.04), 
        cc.v2(1.69, -0.09), cc.v2(1.74, -0.14), cc.v2(1.79, -0.19), cc.v2(1.85, -0.24), 
        cc.v2(1.90, -0.30), cc.v2(1.95, -0.35), cc.v2(1.99, -0.44), cc.v2(2.03, -0.51), 
        cc.v2(2.06, -0.59), cc.v2(2.09, -0.67), cc.v2(2.11, -0.74), cc.v2(2.13, -0.82), 
        cc.v2(2.15, -0.89), cc.v2(2.16, -0.96), cc.v2(2.17, -1.03), cc.v2(2.18, -1.09), 
        cc.v2(2.19, -1.16), cc.v2(2.19, -1.22), cc.v2(2.18, -1.28), cc.v2(2.18, -1.34), 
        cc.v2(2.17, -1.40), cc.v2(2.16, -1.46), cc.v2(2.14, -1.52), cc.v2(2.13, -1.57), 
        cc.v2(2.11, -1.62), cc.v2(2.08, -1.67), cc.v2(2.06, -1.72), cc.v2(2.03, -1.77), 
        cc.v2(2.00, -1.82), cc.v2(1.96, -1.86), cc.v2(1.93, -1.90), cc.v2(1.89, -1.95), 
        cc.v2(1.85, -1.99), cc.v2(1.80, -2.03), cc.v2(1.76, -2.06), cc.v2(1.71, -2.10), 
        cc.v2(1.66, -2.13), cc.v2(1.61, -2.16), cc.v2(1.55, -2.20), cc.v2(1.50, -2.23), 
        cc.v2(1.44, -2.25), cc.v2(1.38, -2.28), cc.v2(1.32, -2.31), cc.v2(1.25, -2.33), 
        cc.v2(1.19, -2.35), cc.v2(1.12, -2.37), cc.v2(1.05, -2.39), cc.v2(0.98, -2.41), 
        cc.v2(0.91, -2.43), cc.v2(0.84, -2.44), cc.v2(0.77, -2.46), cc.v2(0.69, -2.47), 
        cc.v2(0.61, -2.48), cc.v2(0.54, -2.49), cc.v2(0.46, -2.50), cc.v2(0.38, -2.51), 
        cc.v2(0.30, -2.51), cc.v2(0.21, -2.52), cc.v2(0.13, -2.52), cc.v2(0.05, -2.52), 
        cc.v2(-0.04, -2.52), cc.v2(-0.12, -2.52), cc.v2(-0.21, -2.52), cc.v2(-0.30, -2.51), 
        cc.v2(-0.38, -2.51), cc.v2(-0.47, -2.50), cc.v2(-0.56, -2.49), cc.v2(-0.65, -2.49), 
        cc.v2(-0.74, -2.47), cc.v2(-0.81, -2.47), cc.v2(-0.89, -2.45), cc.v2(-0.96, -2.44), 
        cc.v2(-1.03, -2.42), cc.v2(-1.10, -2.40), cc.v2(-1.17, -2.38), cc.v2(-1.23, -2.36), 
        cc.v2(-1.29, -2.33), cc.v2(-1.36, -2.30), cc.v2(-1.41, -2.27), cc.v2(-1.47, -2.24), 
        cc.v2(-1.53, -2.21), cc.v2(-1.58, -2.17), cc.v2(-1.63, -2.13), cc.v2(-1.69, -2.09), 
        cc.v2(-1.73, -2.05), cc.v2(-1.78, -2.01), cc.v2(-1.83, -1.96), cc.v2(-1.87, -1.91), 
        cc.v2(-1.91, -1.87), cc.v2(-1.95, -1.82), cc.v2(-1.99, -1.76), cc.v2(-2.03, -1.71), 
        cc.v2(-2.07, -1.66), cc.v2(-2.10, -1.60), cc.v2(-2.13, -1.55), cc.v2(-2.16, -1.49), 
        cc.v2(-2.19, -1.43), cc.v2(-2.22, -1.37), cc.v2(-2.25, -1.31), cc.v2(-2.27, -1.25), 
        cc.v2(-2.29, -1.18), cc.v2(-2.32, -1.12), cc.v2(-2.34, -1.06), cc.v2(-2.36, -0.99), 
        cc.v2(-2.37, -0.93), cc.v2(-2.39, -0.86), cc.v2(-2.40, -0.79), cc.v2(-2.42, -0.73), 
        cc.v2(-2.43, -0.66), cc.v2(-2.44, -0.59), cc.v2(-2.44, -0.52), cc.v2(-2.45, -0.46), 
        cc.v2(-2.46, -0.39), cc.v2(-2.46, -0.32), cc.v2(-2.47, -0.25), cc.v2(-2.47, -0.18), 
        cc.v2(-2.47, -0.11), cc.v2(-2.47, -0.05), cc.v2(-2.46, 0.02), cc.v2(-2.46, 0.09), 
        cc.v2(-2.43, 0.16), cc.v2(-2.40, 0.14), cc.v2(-2.35, 0.12), cc.v2(-2.29, 0.09), 
        cc.v2(-2.23, 0.06), cc.v2(-2.16, 0.02), cc.v2(-2.01, -0.06), cc.v2(-1.94, -0.11), 
        cc.v2(-1.86, -0.14), cc.v2(-1.80, -0.18), cc.v2(-1.74, -0.21), cc.v2(-1.69, -0.23), 
        cc.v2(-1.64, -0.24), cc.v2(-1.62, -0.24), cc.v2(-1.56, -0.22), cc.v2(-1.51, -0.20), 
        cc.v2(-1.46, -0.18), cc.v2(-1.41, -0.16), cc.v2(-1.36, -0.14), cc.v2(-1.31, -0.12), 
        cc.v2(-1.26, -0.10), cc.v2(-1.20, -0.08), cc.v2(-1.15, -0.06), cc.v2(-1.09, -0.04), 
        cc.v2(-1.04, -0.02), cc.v2(-0.98, 0.00), cc.v2(-0.92, 0.02), cc.v2(-0.86, 0.04), 
        cc.v2(-0.79, 0.06), cc.v2(-0.72, 0.08), cc.v2(-0.65, 0.09), cc.v2(-0.58, 0.11), 
        cc.v2(-0.50, 0.13), cc.v2(-0.42, 0.15), cc.v2(-0.24, 0.19)
    ]

    private indexWaypoint: number = 1;
    private ratio: number = 98;
    public tweenInit: cc.Tween = null;
    public isAutoDraw: boolean = false;
    public version: number = 1;

    onLoad() {
        DrawController.instance = this;
        const self = this;
        cc.game.on(cc.game.EVENT_HIDE, function () {
            self.pauseGame();
        });

        // For event when the app entering foreground
        cc.game.on(cc.game.EVENT_SHOW, function () {
            self.showGame();
        });
        // this.pen.on(cc.Node.EventType.TOUCH_START, this.handleEventTouchStart, this);
        if (this.version == 2) {
            this.pen.on(cc.Node.EventType.TOUCH_MOVE, this.handleEventTouchMove, this);
        }

        for (let i = 0; i < this.arrWaypoint.length; i++) {
            this.arrWaypoint[i].x *= this.ratio;
            this.arrWaypoint[i].y *= this.ratio;
        }
        this.startDraw();
    }

    private pauseGame(): void {
        // console.log("pauseGame");
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

    private handleEventTouchStart(event): void {
        console.log(this.node.convertToNodeSpace(event.getLocation()));
    }

    private handleEventTouchMove(event): void {
        if (this.version == 1) {
            GameController.instance.openAdUrl();
        } else if (this.version === 2) {
            const point = this.node.convertToNodeSpaceAR(event.getLocation());
            this.pen.setPosition(point.x, point.y);
            GameController.instance.openAdUrl();
            this.updateDraw(point);
        }
    }

    private startDraw(): void {
        this.ctx = this.node.getComponent(cc.Graphics);
        this.ctx.lineWidth = 22;
        this.ctx.strokeColor = cc.Color.BLACK;
        const x0: number = this.arrWaypoint[0].x;
        const y0: number = this.arrWaypoint[0].y;
        this.pen.setPosition(x0 + 125, y0 + 125);
        this.btnX.setPosition(x0, y0);
        // this.ctx.moveTo(x0, y0);
        // this.ctx.stroke();
        const timeDelay = 0.2;
        this.tweenInit = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .call(() => {
                        this.ctx.moveTo(x0, y0);
                        this.ctx.lineTo(this.arrWaypoint[1].x, this.arrWaypoint[1].y);
                        this.ctx.stroke();
                        // this.btnX.setPosition(x0, y0);
                        this.pen.setPosition(x0 + 125, y0 + 125);
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

        this.tweenInit.start();
        // this.autoDraw();
    }

    public clearCtx(): void {
        const x0: number = this.arrWaypoint[0].x;
        const y0: number = this.arrWaypoint[0].y;
        this.ctx.clear();
        // this.btnX.setPosition(x0, y0);
        this.ctx.moveTo(x0, y0);
        this.pen.setPosition(x0 + 125, y0 + 125);
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

    private drawDone(): void {
        GameController.instance.stopAudioPen();
        GameController.instance.clickBtnDone();
        // this.createFireWork();
        cc.tween(this.node)
            .delay(1)
            .call(() => {
                GameController.instance.activeStep2(false);
                GameController.instance.activeStep2(true);
            })
            .start();
    }

    private updateDraw(point: cc.Vec2): void {
        if (this.indexWaypoint === this.arrWaypoint.length) {
            this.drawDone();
            return;
        }
        const pointNext = this.arrWaypoint[this.indexWaypoint];
        const distance = this.calDistanceVector2(point.x, point.y, pointNext.x + 125, pointNext.y + 125);
        if (distance > 25) return;
        this.btnX.setPosition(pointNext);
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

    // update (dt) {}
}
