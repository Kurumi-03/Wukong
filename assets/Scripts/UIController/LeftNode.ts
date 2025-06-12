import {
    _decorator,
    CCInteger,
    Component,
    Label,
    Node
} from 'cc';
import {EventManager} from '../Manager/EventManager';
import {ConstManager} from '../Manager/ConstManager';
const {ccclass, property} = _decorator;

@ccclass('LeftNode')
export class LeftNode extends Component {
    @property(Label)
    buyValue : Label | null = null;

    @property(Node)
    buyBtn : Node | null = null;

    @property(Node)
    freeCount : Node | null = null;

    @property(Label)
    freeNum : Label | null = null;

    @property(Label)
    freeWild : Label | null = null;

    @property(CCInteger)
    baseBuyValue : number = 0;

    protected onLoad(): void {
        EventManager.Register("ChangeBuyValue", this.ChangeBuyValue);
    }
    
    protected start(): void {
        this.ShowBuyBtn();
        this.ChangeBuyValue(ConstManager.Instance(ConstManager).betArray[0]);
    }

    ShowBuyBtn() {
        this.buyBtn.active = true;
        this.freeCount.active = false;
    }

    ShowFreeCount() {
        this.buyBtn.active = false;
        this.freeCount.active = true;
    }

    ChangeBuyValue(value : number) {
        this.buyValue.string = "$" + (
            this.baseBuyValue * value
        ).toString();
    }

    ChangeFreeNum(value : number) {
        this.freeNum.string = value.toString();
    }

    ChangeFreeWild(value : number) {
        this.freeWild.string = "*" + value.toString();
    }

    protected onDestroy(): void {
        EventManager.UnRegister("ChangeBuyValue", this.ChangeBuyValue);
    }
}
