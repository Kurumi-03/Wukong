import { _decorator, Component, instantiate, Label, Prefab, sp } from 'cc';
import { ConstManager } from '../Manager/ConstManager';
import { ClearEffect } from '../Effect/ClearEffect';
const { ccclass, property } = _decorator;

@ccclass('Icon')
export class Icon extends Component {
    @property(sp.Skeleton)
    effect: sp.Skeleton | null = null;

    @property(Prefab)
    clearEffect: Prefab | null = null;

    currentIndex: number = 0;

    // 图标下落后   先向下一段距离再向上回到原来位置  此方法为所有图标都具有
    DropEffect(index: number, call) {
        this.currentIndex = index;
        this.effect.setAnimation(0, ConstManager.dropEffectName[index], false);
        this.effect.setCompleteListener((entry) => {
            call();
        });
    }

    // 1-9的普通消除效果
    ClearEffect(index: number, call) {
        let fram = instantiate(this.clearEffect);
        this.node.addChild(fram);

        this.effect.setAnimation(0, ConstManager.winEffectName[index], false);
        this.effect.setCompleteListener((entry) => {
            fram.getComponent(ClearEffect).DestoryEffect();
            this.effect.setAnimation(0, ConstManager.outEffectName[index], false);
            this.effect.setCompleteListener(() => {
                call();
                this.node.destroy();
            })
        })
    }

    //免费游戏的消除效果
    FreeEffect(call) {
        this.effect.setAnimation(0, ConstManager.winEffectName[9], false);
        this.effect.setCompleteListener(() => {
            this.effect.setAnimation(0, ConstManager.outEffectName[9], true);
            call();//回调
        })
    }


}


