import { _decorator, Button, Component, Label, sp } from 'cc';
import { TextEffect } from '../Effect/TextEffect';
import { ConstManager } from '../Manager/ConstManager';
import { DataManager } from '../Manager/DataManager';
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

    ShowPanel(data: number) {
        this.index = this.Judge(DataManager.Instance(DataManager).allBetMultiple);
        if(this.index == -1){
            //小于时不需要显示面板
            return;
        }
        this.node.active = true;
        this.btn.interactable = false;
        this.num.string = "0";
        this.effect.setAnimation(0, ConstManager.winEffectInName[this.index], false);
        this.effect.setCompleteListener(() => {
            if (this.effect.animation == ConstManager.winEffectInName[this.index]) {
                this.effect.setAnimation(0, ConstManager.winEffectLoopName[this.index], true);
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

    //判断属于哪个档位
    Judge(data: number): number {
        let index: number = 0;
        if (data < 20) {
            index = -1;
        }
        else if (data < 50) {
            index = 0;
        }
        else if (data < 100) {
            index = 1;
        }
        else if (data < 300) {
            index = 2;
        }
        else if (data >= 300) {
            index = 3;
        }
        return index;
    }
}


