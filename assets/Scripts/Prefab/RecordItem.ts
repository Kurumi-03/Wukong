import { _decorator, Color, Component, Label, Sprite } from 'cc';
import { RecordInfo } from '../Manager/DataManager';
import { Utils } from '../Use/Utils';
const { ccclass, property } = _decorator;

@ccclass('RecordItem')
export class RecordItem extends Component {
    @property(Label)
    gameName: Label | null = null;

    @property(Label)
    totalBet: Label | null = null;

    @property(Label)
    totalWin: Label | null = null;

    @property(Label)
    get: Label | null = null;

    @property(Label)
    count: Label | null = null;

    @property(Sprite)
    bg: Sprite | null = null;

    @property(Color)
    increaseColor: Color = new Color();

    @property(Color)
    decreaseColor: Color = new Color();

    @property(Color)
    singleColor: Color = new Color();

    @property(Color)
    doubleColor: Color = new Color();

    UpdateItem(info: RecordInfo, index: number) {
        this.gameName.string = info.gameName;
        this.totalBet.string = Utils.NumberToString(info.totalBet);
        this.totalWin.string = Utils.NumberToString(info.totalWin);
        this.get.string = Utils.NumberToString(info.get);
        this.count.string = info.count.toString();
        this.bg.color = index % 2 == 0 ? this.doubleColor : this.singleColor;
        this.get.color = info.get >= 0 ? this.increaseColor : this.decreaseColor;
    }
}


