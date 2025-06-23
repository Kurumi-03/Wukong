import { _decorator, Component, director, Mask, math, Node, ProgressBar, Skeleton, sp, Sprite, tween, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadSlider')
export class LoadSlider extends Component {
    @property(Sprite)
    fillSprite: Sprite | null = null;

    @property(sp.Skeleton)
    completeEffect: sp.Skeleton | null = null;

    // 当前进度(0-1)
    private _progress: number = 0;

    start() {
        // 初始化为空进度
        this.fillSprite.type = Sprite.Type.FILLED;
        this.fillSprite.fillType = Sprite.FillType.HORIZONTAL;
        this.fillSprite.fillCenter = new Vec2(0, 0);
        this.setProgress(0);
    }

    // 设置进度(0-1)
    setProgress(value: number) {
        this._progress = Math.min(1, Math.max(0, value));
        tween(this.fillSprite).to(1, {
            fillRange: this._progress
        }, {
            easing: "sineInOut",
        }).call(() => {
            if (this.fillSprite.fillRange >= 1) {
                this.completeEffect.node.active = true;
            }
        }).start();
    }

    // 增加进度
    addProgress(value: number) {
        this.setProgress(this._progress + value);
    }

    // 检查是否满足条件(示例)
    checkCondition() {
        tween(this).call(() => {
            this.setProgress(0.3);
        }).delay(1).call(() => {
            this.setProgress(0.6);
        }).delay(1).call(() => {
            this.setProgress(1);
            this.scheduleOnce(()=>{
                director.loadScene("Game");
            },1)
        }).start();
    }
}


