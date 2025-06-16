import {
    _decorator,
    CCFloat,
    Component,
    Label,
    utils,
} from 'cc';
import { TextEffect } from '../Effect/TextEffect';
import { EventManager } from '../Manager/EventManager';
import { DataManager } from '../Manager/DataManager';
import { Utils } from '../Use/Utils';
const { ccclass, property } = _decorator;

@ccclass('CountScore')
export class CountScore extends Component {
    @property(Label)
    winScore: Label | null = null;

    @property(Label)
    playerScore: Label | null = null;

    @property(CCFloat)
    changeTime: number = 0;

    winNum: number = 0;
    playerNum: number = 0;

    protected onLoad(): void {
        EventManager.Register("UpdateWinScore", this.UpdateWinScore.bind(this));
        EventManager.Register("UpdatePlayerScore", this.UpdatePlayerScore.bind(this));
    }

    protected start(): void {
        this.winNum = 0;
        this.playerNum = DataManager.Instance(DataManager).playerScore;
        this.winScore.string = Utils.NumberToString(this.winNum);
        this.playerScore.string = Utils.NumberToString(this.playerNum);
    }

    //纯粹赋值
    UpdateWinScore(data: number) {
        this.winScore.getComponent(TextEffect).Roll(this.winNum, data, this.changeTime);
        this.winNum = data;
    }

    //在原有值的基础上更改
    UpdatePlayerScore(data: number) {
        let temp: number = this.playerNum + data;
        this.playerScore.getComponent(TextEffect).Roll(this.playerNum, temp, this.changeTime);
        this.playerNum += data;
    }

    protected onDestroy(): void {
        EventManager.UnRegister("UpdateWinScore", this.UpdateWinScore.bind(this));
        EventManager.UnRegister("UpdatePlayerScore", this.UpdatePlayerScore.bind(this));
    }
}
