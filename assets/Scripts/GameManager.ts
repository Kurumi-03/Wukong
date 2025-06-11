import {_decorator, Component, Node} from 'cc';
import Singleton from './Singleton';
import {BroarCast} from './BroarCast';
import {BetTop} from './BetTop';
import {WinHistory} from './WinHistory';
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

    // 测试按钮
    Debug() {
        let count = 0
        this.schedule(() => {
            this.winHistory.getComponent(WinHistory).AddItem(1, count, 200);
            count++;
        }, 2, 5);
    }
}
