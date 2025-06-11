import {
    _decorator,
    Component,
    Label,
    Node,
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

    // 默认慢速旋转速度（度/秒）
    @property slowSpeed : number = 30;

    // 加速旋转速度（度/秒）
    @property fastSpeed : number = 180;

    // 加速持续时间（秒）
    @property boostDuration : number = 1.5;

    private _rotateTween : Tween < Node > = null;
    private _currentSpeed : number = 0;

    protected start(): void {}

    // 开始慢速旋转
    startSlowRotate() {
        this._currentSpeed = this.slowSpeed;
        this._rotateTween = tween(this.node).by(1, {
            angle: -this.slowSpeed
        }).repeatForever().start();
    }

    // 触发加速旋转
    triggerBoost() { // 停止当前旋转
        if (this._rotateTween) {
            this._rotateTween.stop();
        }

        // 加速旋转阶段
        this._currentSpeed = this.fastSpeed;
        this._rotateTween = tween(this.node).by(1, {
            angle: -this.fastSpeed
        }).repeat(this.boostDuration).call(() => { // 恢复慢速旋转
            this.startSlowRotate();
        }).start();
    }
}
