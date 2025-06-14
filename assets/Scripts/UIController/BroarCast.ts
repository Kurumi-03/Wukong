import {
    _decorator,
    CCInteger,
    Component,
    Node,
    RichText,
    tween,
    UITransform,
    Vec3
} from 'cc';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('BroarCast')
export class BroarCast extends Component {
    @property(RichText)
    text: RichText | null = null;

    @property(Node)
    bg: Node = null;

    @property(CCInteger)
    baseMoveTime: number = 0;

    protected onLoad(): void {
        EventManager.Register("ShowBroadCast", this.ShowBroadCast.bind(this));
    }

    ShowBroadCast(data: string) {
        this.node.active = true;
        this.text.string = data;
        const bgContentX = this.bg.getComponent(UITransform).contentSize.x;
        const textContentX = this.text.node.getComponent(UITransform).contentSize.x;
        this.text.node.position = new Vec3(bgContentX / 2, 0);

        const moveLength = textContentX + bgContentX;
        const time = this.baseMoveTime / bgContentX * textContentX;
        console.log(bgContentX)
        console.log(textContentX);
        console.log(time)
        tween(this.text.node).by(time, {
            position: new Vec3(- moveLength, 0)
        }).delay(1).call(() => {
            this.node.active = false;
        }).start();
    }

    protected onDestroy(): void {
        EventManager.UnRegister("ShowBroadCast", this.ShowBroadCast.bind(this));
    }
}
