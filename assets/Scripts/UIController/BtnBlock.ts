import {
    _decorator,
    Button,
    Component,
    Sprite,
} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('BtnBlock')
export class BtnBlock extends Component {
    @property(Sprite)
    block : Sprite | null = null;

    @property(Button)
    btn : Button | null = null;

    protected start(): void {
        this.EnableBtn();
    }

    EnableBtn() {
        this.block.node.active = false;
        this.btn.interactable = true;
    }

    DisableBtn() {
        this.block.node.active = true;
        this.btn.interactable = false;
    }
}
