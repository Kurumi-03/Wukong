import { _decorator, Component, Label, tween } from 'cc';
import { Utils } from '../Use/Utils';
const { ccclass, property } = _decorator;

@ccclass('TextEffect')
export class TextEffect extends Component {
    @property(Label)
    text: Label = null;

    private currentNum: number = 0;

    Roll(startNum: number, endNum: number, time: number, callback = () => { }) {
        //当要改变的数值小于初始值时直接变小
        if (startNum > endNum) {
            this.text.string = Utils.NumberToString(endNum);
            return;
        }
        //大于时使用动画效果
        this.currentNum = startNum;
        this.text.string = Utils.NumberToString(startNum);
        tween(this).to(time, { currentNum: endNum } as {}, {
            onUpdate: () => {
                this.text.string = Utils.NumberToString(this.currentNum);
            },
            easing: 'sineInOut'
        }).call(() => {
            if(callback){
                callback();//动画完成后的回调
            }
        }).start();
    }
}


