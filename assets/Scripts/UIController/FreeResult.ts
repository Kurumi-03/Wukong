import { _decorator, Button, Component, Label, Node, sp } from 'cc';
import { TextEffect } from '../Effect/TextEffect';
import { ConstManager } from '../Manager/ConstManager';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('FreeResult')
export class FreeResult extends Component {
    @property(Label)
    num: Label | null = null;

    @property(sp.Skeleton)
    bg: sp.Skeleton | null = null;

    @property(Button)
    btn: Button | null = null;

    @property(Node)
    allLabel: Node | null = null;

    private win: number = 0;
    private call;

    ShowResult(data: number, _win: number,_call) {
        this.win = _win;
        this.call = _call;
        this.node.active = true;
        this.btn.interactable = false;
        this.num.string = "0";
        this.bg.setAnimation(0, ConstManager.bannerName[0], false);
        this.bg.setCompleteListener(() => {
            if (this.bg.animation == ConstManager.bannerName[0]) {
                this.bg.setAnimation(0, ConstManager.bannerName[1], true);
                this.num.getComponent(TextEffect).Roll(0, data, 2, () => {
                    this.btn.interactable = true;
                });
            }
        })
    }

    CloseResult() {
        this.bg.setAnimation(0, ConstManager.bannerName[2], false);
        this.btn.interactable = false;
        this.bg.setCompleteListener(() => {
            this.node.active = false;
            this.call();
            GameManager.Instance(GameManager).bigWin.ShowPanel(this.win,this.call);
        })
    }
}


