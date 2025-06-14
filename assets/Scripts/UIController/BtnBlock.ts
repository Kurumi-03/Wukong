import {
    _decorator,
    Button,
    Component,
    Sprite,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BtnBlock')
export class BtnBlock extends Component {
    @property(Sprite)
    block: Sprite | null = null;

    @property(Button)
    btn: Button | null = null;

    protected start(): void {
        this.EnableBtn(true);
    }

    EnableBtn(isShow: boolean) {
        this.block.node.active = !isShow;
        this.btn.interactable = isShow;
    }
}
