import {
    _decorator,
    CCFloat,
    CCInteger,
    Component,
    Label,
    Node,
    Skeleton,
    sp,
    Sprite,
    tween,
    Tween
} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PlayBtn')
export class PlayBtn extends Component {
    @property(Label)
    description : Label | null = null;

    @property(Sprite)
    arrow : Sprite | null = null;

    @property(Label)
    num : Label | null = null;

    @property(sp.Skeleton)
    playEffect : sp.Skeleton = null;

    // 默认慢速旋转速度（度/秒）
    @property(CCInteger)slowSpeed : number = 30;

    // 加速旋转速度（度/秒）
    @property(CCInteger)fastSpeed : number = 180;

    // 加速持续时间（秒）
    @property(CCFloat)boostDuration : number = 1.5;

    private _rotateTween : Tween < Node > = null;
    private _currentSpeed : number = 0;
    private isPlay:boolean = false;

    start() {
        this.startSlowRotate();
        this.AutoMode(false);
    }

    // 开始慢速旋转
    startSlowRotate() {
        this._currentSpeed = this.slowSpeed;
        this._rotateTween = tween(this.arrow.node).by(1, {
            angle: -this.slowSpeed
        }).repeatForever().start();
    }

    // 触发加速旋转
    PlayBtnEffect() { // 停止当前旋转
        if(this.isPlay) return;
        this.isPlay = true;
        this.playEffect.setAnimation(0,"clickVFX",false);
        if (this._rotateTween) {
            this._rotateTween.stop();
        }

        // 加速旋转阶段
        this._currentSpeed = this.fastSpeed;
        this._rotateTween = tween(this.arrow.node).by(this.boostDuration, {
            angle: -this.fastSpeed * this.boostDuration
        }).call(() => { // 恢复慢速旋转
            this.isPlay = false;
            this.startSlowRotate();
        }).start();
    }

    AutoMode(isOpen : boolean, data : number = 0) {
        this.description.node.active = !isOpen;
        this.num.node.active = isOpen;
        this.num.string = data.toString();
    }


}
