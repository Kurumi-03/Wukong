import {
    _decorator,
    Component,
    Node,
    Sprite,
    SpriteFrame
} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('FastBtn')
export class FastBtn extends Component {
    @property(SpriteFrame)
    sprites : SpriteFrame[] = [];

    @property(Sprite)
    img : Sprite | null = null;

    @property(Node)
    fastNode : Node | null = null;

    isFast : boolean = false;
    private isFastNum : number = 0;

    protected start(): void {
        this.img.spriteFrame = this.sprites[0];
        this.fastNode.active = false;
    }

    ChangeFast() {
        this.isFast = !this.isFast;
        this.isFastNum = (this.isFastNum + 1) % 2;
        this.img.spriteFrame = this.sprites[this.isFastNum];
        this.fastNode.active = this.isFast;
    }
}
