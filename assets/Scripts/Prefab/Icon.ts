import { _decorator, Component, instantiate, Label, Prefab, sp, Sprite } from 'cc';
import { ConstManager } from '../Manager/ConstManager';
import { ClearEffect } from '../Effect/ClearEffect';
const { ccclass, property } = _decorator;

@ccclass('Icon')
export class Icon extends Component {
    @property(Sprite)
    img: Sprite | null = null;

    @property(sp.Skeleton)
    effect: sp.Skeleton | null = null;

    @property(Prefab)
    clearEffect: Prefab | null = null;

    currentIndex: number = 0;

    // 图标下落后   先向下一段距离再向上回到原来位置 
    DropEffect(index: number, call) {
        this.currentIndex = index;
        if (index == 9) {
            //免费图标有特殊处理
            this.effect.setAnimation(0, ConstManager.iconDropEffectName[index], false);
            this.effect.setCompleteListener((entry) => {
                call();
            });
        }
        else {
            this.effect.node.active = true;
            this.img.node.active = false;
            this.effect.setAnimation(0, ConstManager.iconDropEffectName[index], false);
            this.effect.setCompleteListener((entry) => {
                this.effect.node.active = false;
                this.img.node.active = true;
                call();
            });
        }
    }

    // 1-9的普通消除效果
    ClearEffect(index: number, call) {
        let fram = instantiate(this.clearEffect);
        this.node.addChild(fram);
        this.effect.node.active = true;
        this.img.node.active = false;
        this.effect.setAnimation(0, ConstManager.iconWinEffectName[index], false);
        this.effect.setCompleteListener((entry) => {
            fram.getComponent(ClearEffect).DestoryEffect();
            this.effect.setAnimation(0, ConstManager.iconOutEffectName[index], false);
            this.effect.setCompleteListener(() => {
                this.effect.node.active = false;
                call();
                this.node.destroy();
            })
        })
    }

    //免费游戏的消除效果
    FreeEffect(call) {
        this.effect.setAnimation(0, ConstManager.iconWinEffectName[9], false);
        this.effect.setCompleteListener(() => {
            this.effect.setAnimation(0, ConstManager.iconOutEffectName[9], true);
            call();//回调
        })
    }


}


