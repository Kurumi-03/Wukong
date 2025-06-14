import { _decorator, Component, Node, Sprite } from 'cc';
import { ResourcesManager } from '../Manager/ResourcesManager';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('BackGround')
export class BackGround extends Component {
    @property(Sprite)
    bg: Sprite | null = null;

    @property(Sprite)
    panelBg: Sprite | null = null;

    private type: number = 0;//默认为0  正常背景  进入免费游戏模式时为特殊背景 为1

    protected start(): void {
        this.ChangeBg(0);
    }

    protected onLoad(): void {
        EventManager.Register("ChangeBg", this.ChangeBg.bind(this));
    }

    ChangeBg(data: number) {
        let sprites = ResourcesManager.Instance(ResourcesManager).bgImg;
        this.type = data;
        this.bg.spriteFrame = sprites[this.type];
        this.panelBg.spriteFrame = sprites[this.type + 2];
    }

    protected onDestroy(): void {
        EventManager.UnRegister("ChangeBg", this.ChangeBg.bind(this));
    }
}


