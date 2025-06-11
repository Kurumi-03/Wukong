import {
    _decorator,
    Component,
    Label,
    labelAssembler,
    Node
} from 'cc';
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

    protected start(): void {
        this.ShowBuyBtn();
        this.ChangeBuyValue(200);
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
        this.buyValue.string = "$" + value.toString();
    }

    ChangeFreeNum(value : number) {
        this.freeNum.string = value.toString();
    }

    ChangeFreeWild(value:number){
        this.freeWild.string = "*"+value.toString();
    }
}
