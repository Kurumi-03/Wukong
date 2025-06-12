import {_decorator, Component, Node} from 'cc';
import Singleton from '../Use/Singleton';
import {PlayBtn} from '../UIController/PlayBtn';
import {BottomRoot} from '../UIController/BottomRoot';
const {ccclass, property} = _decorator;

@ccclass('GameManager')
export class GameManager extends Singleton < GameManager > {
    protected onLoad(): void {
        GameManager._instance = this;
    }

    @property(Node)
    boradCast : Node | null = null;

    @property(Node)
    betTop : Node | null = null;

    @property(Node)
    winHistory : Node | null = null;

    @property(Node)
    playBtn : Node | null = null;

    @property(Node)
    bottonRoot : Node | null = null;

    // 测试按钮
    Debug() {
        // let count = 0
        // this.schedule(() => {
        //     this.winHistory.getComponent(WinHistory).AddItem(1, count, 200);
        //     count++;
        // }, 2, 5);
        // this.playBtn.getComponent(PlayBtn).triggerBoost();
        this.bottonRoot.getComponent(BottomRoot).DisableAllBtn();
    }
}
