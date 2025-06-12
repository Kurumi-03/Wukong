import {
    _decorator,
    CCFloat,
    Component,
    Label,
    Node,
    Sprite,
    tween,
    UIOpacity
} from 'cc';
import { ResourcesManager } from '../Manager/ResourcesManager';
import { TextEffect } from '../Effect/TextEffect';
const {ccclass, property} = _decorator;

@ccclass('BetTop')
export class BetTop extends Component {
    @property(Sprite)
    loopText : Sprite | null = null;

    @property(CCFloat)
    showTime : number = 0;

    @property(CCFloat)
    fadeTime : number = 0;

    @property(Node)
    winScore : Node | null = null;

    @property(Label)
    scoreLabel : Label | null = null;

    @property(CCFloat)
    scoreChangeTime : number = 0;

    @property(Label)
    multiplierLabel : Label | null = null;

    private count : number = 0;
    private spriteArray = null;

    private lastScore : number = 0;
    private lastMultiplier : number = 0;

    protected start(): void {
        this.loopText.node.active = true;
        this.winScore.active = false;
        this.spriteArray = ResourcesManager.Instance(ResourcesManager).loopTextArrzy;
        this.ShowLoopText();
    }

    ShowLoopText() {
        this.loopText.node.active = true;
        this.loopText.getComponent(UIOpacity).opacity = 255;
        this.winScore.active = false;

        this.loopText.spriteFrame = this.spriteArray[0];
        this.FadeIn();
    }

    FadeIn() {
        const fade = this.loopText.getComponent(UIOpacity);
        tween(fade).delay(this.showTime).to(this.fadeTime, {opacity: 0}).call(() => {
            this.count = (this.count + 1) % this.spriteArray.length;
            this.loopText.spriteFrame = this.spriteArray[this.count];
            this.FadeOut();
        }).start();
    }

    FadeOut() {
        const spriteArray = ResourcesManager.Instance(ResourcesManager).loopTextArrzy;
        const fade = this.loopText.getComponent(UIOpacity);
        tween(fade).to(this.fadeTime, {opacity: 255}).call(() => {
            this.FadeIn();
        }).start();
    }

    ShowWinScore(score : number) {
        this.winScore.active = true;
        this.loopText.node.active = false;
        this.multiplierLabel.node.active = false;
        tween(this.loopText.getComponent(UIOpacity)).stop();

        this.scoreLabel.node.getComponent(TextEffect).Roll(this.lastScore, score, this.scoreChangeTime);
        this.lastScore = score;
    }

    ShowMultiplier(multiplier : number) {
        this.multiplierLabel.node.active = true;
        this.multiplierLabel.string = "*" + multiplier;
        this.lastMultiplier = multiplier;
    }
}
