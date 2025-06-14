import { _decorator, color, Color, Component, Label, Sprite } from 'cc';
import { HistoryInfo } from '../Manager/ConstManager';
const { ccclass, property } = _decorator;

@ccclass('HistroyItem')
export class HistroyItem extends Component {
    @property(Label)
    date: Label | null = null;

    @property(Label)
    gameName: Label | null = null;

    @property(Label)
    betCount: Label | null = null;

    @property(Label)
    get: Label | null = null;

    @property(Color)
    increaseColor: Color = new Color();

    @property(Color)
    decreaseColor: Color = new Color();

    @property(Sprite)
    bg: Sprite | null = null;

    @property(Color)
    singleColor: Color = new Color();

    @property(Color)
    doubleColor: Color = new Color();


    //index用以标记序号单双来更改背景
    UpdateInfo(info: HistoryInfo, index: number) {
        this.date.string = info.date;
        this.gameName.string = info.gameName;
        this.betCount.string = info.betCount.toString();
        this.get.color = info.get >= 0 ? this.increaseColor : this.decreaseColor;
        this.get.string = info.get.toString();
        this.bg.color = index % 2 == 0 ? this.doubleColor : this.singleColor;
    }
}


