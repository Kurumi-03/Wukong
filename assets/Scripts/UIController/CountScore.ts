import {
    _decorator,
    CCFloat,
    Component,
    Label,
} from 'cc';
import { TextEffect } from '../Effect/TextEffect';
import { EventManager } from '../Manager/EventManager';
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
        this.winScore.string = this.winNum.toString();
        this.playerScore.string = this.playerNum.toString();
    }

    UpdateWinScore(data: number) {
        this.winScore.getComponent(TextEffect).Roll(this.winNum, data, this.changeTime);
        this.winNum = data;
    }

    UpdatePlayerScore(data: number) {
        this.playerScore.getComponent(TextEffect).Roll(this.playerNum, data, this.changeTime);
        this.playerNum = data;
    }

    protected onDestroy(): void {
        EventManager.UnRegister("UpdateWinScore", this.UpdateWinScore.bind(this));
        EventManager.UnRegister("UpdatePlayerScore", this.UpdatePlayerScore.bind(this));
    }
}
