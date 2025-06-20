import { _decorator, Component, Node, tween } from 'cc';
import Singleton from '../Use/Singleton';
import { PlayBtn } from '../UIController/PlayBtn';
import { BottomRoot } from '../UIController/BottomRoot';
import { JRPanel } from '../UIController/JRPanel';
import { WinHistory } from '../UIController/WinHistory';
import { BetTop } from '../UIController/BetTop';
import { BroarCast } from '../UIController/BroarCast';
import { EventManager } from './EventManager';
import { FreeResult } from '../UIController/FreeResult';
import { BigWin } from '../UIController/BigWin';
import { BetPanel } from '../UIController/BetPanel';
import { DataManager } from './DataManager';
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

    @property(FreeResult)
    freeResult: FreeResult | null = null;

    @property(BigWin)
    bigWin: BigWin | null = null;

    @property(BetPanel)
    betPanel: BetPanel | null = null;

    // 测试按钮
    Debug() {
        // this.freeResult.ShowResult(23.55);
        // this.bigWin.ShowPanel(31.5, 0);
        // this.betPanel.FreeGame();
        DataManager.Instance(DataManager).deskData = [
            [
                [1, 0, 2, 3, 4, 5],
                [2, 7, 1, 9, 1, 1],
                [1, 3, 4, 6, 7, 9],
                [1, 2, 5, 9, 1, 3],
                [3, 5, 1, 4, 6, 8],
            ],
            [
                [4, 0, 2, 3, 8, 7],
                [5, 7, 0, 9, 7, 5],
                [6, 3, 2, 6, 4, 9],
                [2, 2, 4, 9, 7, 3],
                [3, 5, 5, 4, 6, 8],
            ],
        ]
    }
}
