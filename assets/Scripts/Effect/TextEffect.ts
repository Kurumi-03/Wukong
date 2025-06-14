import { _decorator, Component, Label, tween } from 'cc';
import { Utils } from '../Use/Utils';
const { ccclass, property } = _decorator;

@ccclass('TextEffect')
export class TextEffect extends Component {
    @property(Label)
    text: Label = null;

    private currentNum: number = 0;

    Roll(startNum: number, endNum: number, time: number) {
        this.currentNum = startNum;
        this.text.string = Utils.NumberToString(startNum);
        tween(this).to(time, { currentNum: endNum } as {}, {
            onUpdate: () => {
                this.text.string = Utils.NumberToString(this.currentNum);
            },
            easing: 'sineInOut'
        }).start();
    }
}


