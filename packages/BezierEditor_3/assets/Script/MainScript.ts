// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Commondata from "./Commondata";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScript extends cc.Component {

    @property(cc.Graphics)
    brush: cc.Graphics = null;

    @property(cc.Node)
    diban: cc.Node = null;

    @property(cc.Node)
    sprites: Array<cc.Node> = [];

    @property(cc.Label)
    tNumber: cc.Label = null;

    aPonits = [];
    timewait = false;

    onEnable(){
        this.aPonits = [];
        this.brush.clear(true);
        this.rigisteTouchEvent();
        this.brush.moveTo(this.sprites[0].x,this.sprites[0].y);
    }

    rigisteTouchEvent(){
        console.log('function -------- rigisteTouchEvent');
        for(let i=0; i<4; i++) {
            // this.aPonits[i].on(cc.Node.EventType.TOUCH_START, this.touchBegin, this);
            this.sprites[i].on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
            this.sprites[i].on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
            this.sprites[i].on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        }
    }

    clearTouchEvent(){
        console.log('function -------- clearTouchEvent');
        for(let i=0; i<4; i++) {
            // this.aPonits[i].off(cc.Node.EventType.TOUCH_START, this.touchBegin, this);
            this.sprites[i].off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
            this.sprites[i].off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
            this.sprites[i].off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        }
    }

    touchBegin(event){
        // console.log('function -------- touchBegin');
        let TouchPos = this.diban.convertToNodeSpaceAR(event.touch._point);
    }

    touchMove(event){
        // console.log('function -------- touchMove');
        event.target.position = this.diban.convertToNodeSpaceAR(event.touch._point);
        this.drawLine();
    }

    touchEnd(event){
        // console.log('function -------- touchEnd');
        event.target.position = this.diban.convertToNodeSpaceAR(event.touch._point);
        this.drawLine();
    }

    touchCancel(event){
        // console.log('function -------- touchCancel');
    }

    drawLine(){
        if(this.timewait){
            return;
        }
        this.timewait = true;
        setTimeout(()=>{
            this.timewait = false;
        }, 50);
        this.brush.clear();
        // console.log('point0 = ' + this.sprites[0].position);
        // console.log('point1 = ' + this.sprites[1].position);
        // console.log('point2 = ' + this.sprites[2].position);
        // console.log('point3 = ' + this.sprites[3].position);
        this.brush.moveTo(this.sprites[0].x,this.sprites[0].y);
        this.brush.bezierCurveTo(this.sprites[1].x,this.sprites[1].y,this.sprites[2].x,this.sprites[2].y,this.sprites[3].x,this.sprites[3].y);
        this.brush.stroke();
        // this.brush.fill();
    }

    onButtonClick(event, data){
        switch(parseInt(data)){
            case 1:
                let str1 = this.aPonits.join('\n');
                this.brush.clear();
                this.tNumber.string = str1;
                this.sprites[0].position = cc.v2(100, 400);
                this.sprites[1].position = cc.v2(500, 400);
                this.sprites[2].position = cc.v2(900, 400);
                this.sprites[3].position = cc.v2(1300, 400);
                break;
            case 2:
                let item = [this.sprites[0].position, this.sprites[1].position, this.sprites[2].position, this.sprites[3].position]
                this.aPonits.push(item);
                this.tNumber.string = '当前一共'+this.aPonits.length+'组。';
                break;
            case 3:
                if(this.aPonits.length) {
                    this.aPonits.pop();
                    let str2 = this.aPonits.join('\n');
                    this.tNumber.string = str2;
                }
                else {
                    this.tNumber.string = '当前没有缓存曲线了。';
                }
                break;
            case 4:
                var writeable_path = jsb.fileUtils.getWritablePath();
                console.log(writeable_path);
                var new_dir = writeable_path + "bezier_dir";
                if(!jsb.fileUtils.isDirectoryExist(new_dir)) {
                    jsb.fileUtils.createDirectory(new_dir);
                }
                else {
                    console.log("dir is exist!!!");
                }
                let addstr = this.aPonits.join('} \n{');
                var str_data = jsb.fileUtils.getStringFromFile(new_dir + "/bezier_keypoint.txt");
                console.log('11111' + str_data);
                str_data = str_data + '{' + addstr + '} \n';
                console.log('22222' + str_data);
                jsb.fileUtils.writeStringToFile(str_data, new_dir + "/bezier_keypoint.txt");
                this.aPonits = [];
                this.tNumber.string = '当前一共'+this.aPonits.length+'组。';
                break;
        }
    }
}
