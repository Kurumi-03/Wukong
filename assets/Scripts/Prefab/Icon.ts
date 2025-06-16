import { _decorator, CCInteger, Component, Node, sp, Sprite, tween, Vec3 } from 'cc';
import { ConstManager } from '../Manager/ConstManager';
const { ccclass, property } = _decorator;

@ccclass('Icon')
export class Icon extends Component {
    @property(sp.Skeleton)
    effect: sp.Skeleton | null = null;

    // 图标下落后   先向下一段距离再向上回到原来位置
    DropEffect(index: number, call) {
        this.effect.setAnimation(0, ConstManager.dropEffectName[index], false);
        this.effect.setCompleteListener((entry) => {
            call();
        });
    }

    // 消除效果
    ClearEffect(index: number, call) {
        this.effect.setAnimation(0, ConstManager.winEffectName[index], false);
        this.effect.setCompleteListener((entry) => {
            this.effect.setAnimation(0, ConstManager.outEffectName[index], false);
            this.effect.setCompleteListener(() => {
                call();
                this.node.destroy();
            })
        })
    }
}


