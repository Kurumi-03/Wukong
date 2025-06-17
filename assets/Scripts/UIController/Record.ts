import { _decorator, color, Color, Component, Label, Node, SpriteFrame, ToggleContainer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Record')
export class Record extends Component {
    @property(ToggleContainer)
    selectDate: ToggleContainer | null = null;

    @property(Label)
    tip: Label | null = null;

    protected start(): void {
        
    }

    //根据点击的复选框得到选择的数据
    CheckDate() {
        let childen = this.selectDate.toggleItems;
        for (let i = 0; i < childen.length; i++) {
            if (childen[i].isChecked) {
                childen[i].node.getComponentInChildren(Label).color = Color.BLACK;
                //需要逻辑处理
            }
            else {
                childen[i].node.getComponentInChildren(Label).color = Color.WHITE;
            }
        }
    }
}


