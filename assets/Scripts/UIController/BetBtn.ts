import {
    _decorator,
    CCFloat,
    Component,
    EventTouch,
    Label,
    misc,
    Node,
    Sprite,
    tween,
    UITransform,
    Vec2
} from 'cc';
import { ConstManager } from '../Manager/ConstManager';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('BetBtn') export class BetBtn extends Component {
    @property(Label)
    num: Label | null = null;

    @property(Sprite)
    betSlider: Sprite | null = null;

    @property(Node)
    block: Node | null = null;

    @property(CCFloat)
    changeTime: number = 0;

    @property(CCFloat)
    smooth: number = 0; // 使得滑动较小的距离就能改变

    currentIndex: number = 0;
    currentBet: number = 0;

    private startPos: Vec2 = null;

    protected onLoad(): void {
        this.betSlider.node.on(Node.EventType.TOUCH_START, this.OnTouchStart, this);
        this.betSlider.node.on(Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
    }

    protected start(): void {
        let array = ConstManager.Instance(ConstManager).betArray;
        this.num.string = array[this.currentIndex].toString();
        this.betSlider.fillRange = 0;
        this.EnableBtn(true);
    }

    Add() {
        let array = ConstManager.Instance(ConstManager).betArray;
        if (this.currentIndex >= array.length - 1)
            return;

        this.currentIndex++;
        this.ChangeValue(array[this.currentIndex]);
        tween(this.betSlider).to(this.changeTime, {
            fillRange: this.currentIndex / (array.length - 1)
        }).start();
    }

    Delete() {
        let array = ConstManager.Instance(ConstManager).betArray;
        if (this.currentIndex <= 0)
            return;

        this.currentIndex--;
        this.ChangeValue(array[this.currentIndex]);
        tween(this.betSlider).to(this.changeTime, {
            fillRange: this.currentIndex / (array.length - 1)
        }).start();
    }

    OnTouchStart(event: EventTouch) {
        this.startPos = event.getUILocation();
    }

    OnTouchMove(event: EventTouch) {
        const delta = (event.getUILocation().x - this.startPos.x) * this.smooth;
        const progress = misc.clampf((this.betSlider.fillRange + delta / this.node.getComponent(UITransform).width), 0, 1);
        this.betSlider.fillRange = progress;
        this.startPos = event.getUILocation();
        this.GetBetValue(progress);
    }

    // 根据触摸的值来得到下注值
    GetBetValue(progress: number) {
        let array = ConstManager.Instance(ConstManager).betArray;
        let index = Math.floor((array.length - 1) * progress);
        this.ChangeValue(array[index]);
    }

    ChangeValue(data: number) {
        this.currentBet = data;
        this.num.string = this.currentBet.toString();
        EventManager.Send("ChangeBuyValue", this.currentBet);
    }

    EnableBtn(isShow: boolean) {
        this.block.active = !isShow;
    }
}
