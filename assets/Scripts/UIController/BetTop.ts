import {
    _decorator,
    CCFloat,
    Component,
    Label,
    Node,
    Sprite,
    tween,
    UIOpacity,
    Vec3
} from 'cc';
import { ResourcesManager } from '../Manager/ResourcesManager';
import { TextEffect } from '../Effect/TextEffect';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('BetTop')
export class BetTop extends Component {
    @property(Sprite)
    loopText: Sprite | null = null;

    @property(CCFloat)
    showTime: number = 0;

    @property(CCFloat)
    fadeTime: number = 0;

    @property(Node)
    winScore: Node | null = null;

    @property(Label)
    scoreLabel: Label | null = null;

    @property(CCFloat)
    scoreChangeTime: number = 0;

    @property(Label)
    multiplierLabel: Label | null = null;

    private count: number = 0;
    private spriteArray = null;

    private lastScore: number = 0;
    private lastMultiplier: number = 0;

    protected onLoad(): void {
        EventManager.Register("ShowLoopText", this.ShowLoopText.bind(this));
        EventManager.Register("ShowWinScore", this.ShowWinScore.bind(this));
        EventManager.Register("ShowMultiplier", this.ShowMultiplier.bind(this));
    }

    protected start(): void {
        this.loopText.node.active = true;
        this.winScore.active = false;
        this.spriteArray = ResourcesManager.Instance(ResourcesManager).loopTextArrzy;
        this.ShowLoopText();
        this.loopText.getComponent(UIOpacity).opacity = 255;
        this.winScore.active = false;
        this.loopText.spriteFrame = this.spriteArray[0];
        this.FadeIn();
    }

    ShowLoopText() {
        this.loopText.node.active = true;
        this.winScore.active = false;
    }

    FadeIn() {
        const fade = this.loopText.getComponent(UIOpacity);
        tween(fade).delay(this.showTime).to(this.fadeTime, { opacity: 0 }).call(() => {
            this.count = (this.count + 1) % this.spriteArray.length;
            this.loopText.spriteFrame = this.spriteArray[this.count];
            this.FadeOut();
        }).start();
    }

    FadeOut() {
        const spriteArray = ResourcesManager.Instance(ResourcesManager).loopTextArrzy;
        const fade = this.loopText.getComponent(UIOpacity);
        tween(fade).to(this.fadeTime, { opacity: 255 }).call(() => {
            this.FadeIn();
        }).start();
    }

    ShowWinScore(score: number,call = null) {
        this.winScore.active = true;
        this.loopText.node.active = false;
        this.multiplierLabel.node.active = false;
        // tween(this.loopText.getComponent(UIOpacity)).stop();
        this.scoreLabel.node.getComponent(TextEffect).Roll(this.lastScore, score, this.scoreChangeTime,call);
        this.lastScore = score;
    }

    ShowMultiplier(multiplier: number) {
        this.multiplierLabel.node.active = true;
        this.multiplierLabel.string = "*" + multiplier;
        //此处需要动画效果
        tween(this.scoreLabel.node).delay(0.5).by(0.5, {
            position: new Vec3(5, 0)
        }).to(0.2, {
            scale: new Vec3(1.2, 1.2, 1.2)
        }).call(() => {
            let score = this.lastScore * multiplier;
            this.scoreLabel.node.getComponent(TextEffect).Roll(this.lastScore, score, this.scoreChangeTime);
        }).to(0.2, {
            scale: new Vec3(1, 1, 1)
        }).start();

        tween(this.multiplierLabel.node).delay(0.5).by(0.5, {
            position: new Vec3(-5, 0)
        }).call(() => {
            this.multiplierLabel.node.active = false;
        }).start()
    }

    protected onDestroy(): void {
        EventManager.UnRegister("ShowLoopText", this.ShowLoopText.bind(this));
        EventManager.UnRegister("ShowWinScore", this.ShowWinScore.bind(this));
        EventManager.UnRegister("ShowMultiplier", this.ShowMultiplier.bind(this));
    }
}
