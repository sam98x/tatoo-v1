import GameController from './GameController';

const {ccclass, property} = cc._decorator;

@ccclass
export default class DrawController extends cc.Component {

    @property(cc.Node)
    pen: cc.Node = null;

    @property(cc.Node)
    btnX: cc.Node = null;

    ctx: cc.Graphics = null;
    private arrWaypoint = [
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

    private indexWaypoint: number = 1;
    private ratio: number = 98;

    onLoad () {
        // this.pen.on(cc.Node.EventType.TOUCH_START, this.handleEventTouchStart, this);
        this.pen.on(cc.Node.EventType.TOUCH_MOVE, this.handleEventTouchMove, this);
        for (let i = 0; i < this.arrWaypoint.length; i++) {
            this.arrWaypoint[i].x *= this.ratio;
            this.arrWaypoint[i].y *= this.ratio;
        }
        this.startDraw();
    }

    handleEventTouchStart(event) {
        console.log(this.node.convertToNodeSpace(event.getLocation()));
    }

    private handleEventTouchMove(event): void {
        const point = this.node.convertToNodeSpaceAR(event.getLocation());
        this.pen.setPosition(point);
        GameController.instance.openAdUrl();
        this.updateDraw(point);
    }

    private startDraw(): void {
        this.ctx = this.node.getComponent(cc.Graphics);
        this.ctx.lineWidth = 20;
        this.ctx.strokeColor = cc.Color.RED;
        const x0: number = this.arrWaypoint[0].x;
        const y0: number = this.arrWaypoint[0].y;
        this.pen.setPosition(x0, y0);
        this.btnX.setPosition(x0, y0);
        this.ctx.moveTo(x0, y0);
        /*  for (let i = 1; i < this.arrWaypoint.length; i++) {
            this.ctx.lineTo(this.arrWaypoint[i].x, this.arrWaypoint[i].y);
        } */
        this.ctx.stroke();
    }

    private updateDraw(point: cc.Vec2) {
        if (this.indexWaypoint === this.arrWaypoint.length) {
            cc.tween(this.node)
            .delay(1)
            .call(() => {
                GameController.instance.activeStep2(false);
                GameController.instance.activeStep2(true);
            })
            .start()
            return;
        }
        const pointNext = this.arrWaypoint[this.indexWaypoint];
        const distance = this.calDistanceVector2(point.x, point.y, pointNext.x, pointNext.y);
        if (distance > 25) return;
        this.btnX.setPosition(pointNext);
        this.ctx.lineTo(pointNext.x, pointNext.y);
        this.ctx.stroke();
        this.indexWaypoint++;
    }

    private calDistanceVector2(x1, y1, x2, y2): number {
        return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    }

    start () {

    }



    // update (dt) {}
}
