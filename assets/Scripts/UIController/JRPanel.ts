import {
    _decorator,
    CCFloat,
    CCInteger,
    Component,
    EventTouch,
    Label,
    Node,
    tween,
    Tween,
    Vec3
} from 'cc';
import { TextEffect } from '../Effect/TextEffect';
import { EventManager } from '../Manager/EventManager';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('JRPanel')
export class JRPanel extends Component {
    @property(Label)
    texts: Label[] = [];

    @property(Node)
    jrNodes: Node | null = null;

    @property(CCFloat)
    changeTime: number = 0;

    @property(CCFloat)
    moveTime: number = 0;

    @property(CCInteger)
    offsetY: number = 0;

    jrData: number[] = [];

    private isShow: boolean = false; // 默认开启显示  所以首次点击为隐藏
    private isMove: boolean = false;

    protected onLoad(): void {
        EventManager.Register("ChangeJRValue", this.ChangeJRValue.bind(this));
    }

    protected start(): void {
        for (let i = 0; i < this.texts.length; i++) {
            this.jrData[i] = 0;
        }
        this.ChangeJRValue();
    }

    ChangeJRValue() {
        for (let i = 0; i < this.jrData.length; i++) {
            this.texts[i].getComponent(TextEffect).Roll(this.jrData[i], DataManager.Instance(DataManager).jrData[i], this.changeTime);
        }
    }

    ShowJRPanel(touch: EventTouch) {
        if (this.isMove) {
            return;
        }
        this.isMove = true;
        let movePosY = this.isShow ? -this.offsetY : this.offsetY;
        tween(this.jrNodes).to(this.moveTime, {
            position: new Vec3(this.jrNodes.position.x, this.jrNodes.position.y + movePosY)
        }).call(() => {
            this.isMove = false;
        }).start();
        this.isShow = !this.isShow;
    }

    protected onDestroy(): void {
        EventManager.UnRegister("ChangeJRValue", this.ChangeJRValue.bind(this));
    }
}
