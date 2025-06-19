import { _decorator, Button, Component, Label, sp } from 'cc';
import { TextEffect } from '../Effect/TextEffect';
import { ConstManager } from '../Manager/ConstManager';
const { ccclass, property } = _decorator;

@ccclass('BigWin')
export class BigWin extends Component {
    @property(sp.Skeleton)
    effect: sp.Skeleton | null = null;

    @property(Label)
    num: Label | null = null;

    @property(Button)
    btn: Button | null = null;

    index: number = 0;

    ShowPanel(data: number, index: number) {
        this.index = index;
        this.node.active = true;
        this.btn.interactable = false;
        this.effect.setAnimation(0, ConstManager.winEffectInName[index], false);
        this.effect.setCompleteListener(() => {
            if(this.effect.animation == ConstManager.winEffectInName[index]){
                this.effect.setAnimation(0, ConstManager.winEffectLoopName[index], true);
                this.num.getComponent(TextEffect).Roll(0, data, 2, () => {
                    this.btn.interactable = true;
                });
            }
        })
    }

    ClosePanel() {
        this.effect.setAnimation(0, ConstManager.winEffectOutName[this.index], false);
        this.btn.interactable = false;
        this.effect.setCompleteListener(() => {
            this.node.active = false
        })
    }
}


