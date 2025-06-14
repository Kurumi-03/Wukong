import { _decorator, Component, Node } from 'cc';
import Singleton from '../Use/Singleton';
import { PlayBtn } from '../UIController/PlayBtn';
import { BottomRoot } from '../UIController/BottomRoot';
import { JRPanel } from '../UIController/JRPanel';
import { WinHistory } from '../UIController/WinHistory';
import { BetTop } from '../UIController/BetTop';
import { BroarCast } from '../UIController/BroarCast';
import { EventManager } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Singleton<GameManager> {
    protected onLoad(): void {
        GameManager._instance = this;
    }

    @property(BroarCast)
    boradCast: BroarCast | null = null;

    @property(BetTop)
    betTop: BetTop | null = null;

    @property(WinHistory)
    winHistory: WinHistory | null = null;

    @property(BottomRoot)
    bottonRoot: BottomRoot | null = null;

    @property(JRPanel)
    jrPanel: JRPanel | null = null;

    // 测试按钮
    Debug() {
        // let count = 0
        // this.schedule(() => {
        //     this.winHistory.AddItem(1, count, 200);
        //     count++;
        // }, 2, 5);
        this.bottonRoot.EnableAllBtn(false);
        // this.jrPanel.ChangeJRValue();
        // EventManager.Send("UpdateWinScore", 21425.45);
        // EventManager.Send("Action");
    }
}
