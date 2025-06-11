import {
    _decorator,
    Component,
    EventTouch,
    Label,
    Node,
    Vec3
} from 'cc';
import {Utils} from './Utils';
const {ccclass, property} = _decorator;

@ccclass('JRPanel')
export class JRPanel extends Component {
    @property(Label)
    texts : Label[] = [];

    @property(Node)
    jrNodes : Node | null = null;

    private offsetY : number = 30;
    private isShow : boolean = false; // 默认开启显示  所以首次点击为隐藏

    ChangeJRValue(values : number[]) {
        for (let i = 0; i < values.length; i++) {
            this.texts[i].string = Utils.NumberToString(values[i]);
        }
    }

    ShowJRPanel(touch : EventTouch) {
        if (this.isShow == true) {
            this.jrNodes.position = new Vec3(this.jrNodes.position.x, this.jrNodes.position.y - this.offsetY);
        } else {
            this.jrNodes.position = new Vec3(this.jrNodes.position.x, this.jrNodes.position.y + this.offsetY);
        }
        this.isShow = !this.isShow;
    }
}
