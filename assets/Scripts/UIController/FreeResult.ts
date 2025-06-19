import { _decorator, Button, Component, Label, Node, sp } from 'cc';
import { TextEffect } from '../Effect/TextEffect';
const { ccclass, property } = _decorator;

@ccclass('FreeResult')
export class FreeResult extends Component {
    @property(Label)
    num: Label | null = null;

    @property(sp.Skeleton)
    bg: sp.Skeleton | null = null;

    @property(Button)
    btn: Button | null = null;

    ShowResult(data: number) {
        this.node.active = true;
        this.btn.interactable = false;
        this.num.string = "0";
        this.num.getComponent(TextEffect).Roll(0, data, 2, () => {
            this.btn.interactable = true;
        });
    }

    CloseResult(){
        this.node.active = false;
    }
}


