import {
    _decorator,
    Button,
    Component,
    Label,
    Node
} from 'cc';
import { EventManager } from '../Manager/EventManager';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('LeftNode')
export class LeftNode extends Component {
    @property(Label)
    buyValue: Label | null = null;

    @property(Node)
    buyBtn: Node | null = null;

    @property(Node)
    freeCount: Node | null = null;

    @property(Label)
    freeNum: Label | null = null;

    @property(Label)
    freeWild: Label | null = null;

    @property(Node)
    block: Node | null = null;

    protected onLoad(): void {
        EventManager.Register("ChangeBuyValue", this.ChangeBuyValue.bind(this));
        EventManager.Register("ShowNode", this.ShowNode.bind(this));
        EventManager.Register("ChangeFreeNum", this.ChangeFreeNum.bind(this));
        EventManager.Register("ChangeFreeWild", this.ChangeFreeWild.bind(this));
    }

    protected start(): void {
        this.ShowNode(0);
        this.ChangeBuyValue(DataManager.Instance(DataManager).betArray[0]);
        this.block.active = false;
    }

    //0为显示buyBtn   1为显示free count
    ShowNode(index: number) {
        if (index == 0) {
            this.buyBtn.active = true;
            this.freeCount.active = false;
        }
        else if (index == 1) {
            this.buyBtn.active = false;
            this.freeCount.active = true;
            this.ChangeFreeNum();
            this.ChangeFreeWild(0);//每次打开页面 初始为0
        }
    }

    ChangeBuyValue(value: number) {
        this.buyValue.string = "$" + (
            DataManager.Instance(DataManager).baseBuyValue * value
        ).toString();
    }

    ChangeFreeNum() {
        this.freeNum.string = DataManager.Instance(DataManager).freeCount.toString();
    }

    ChangeFreeWild(value: number) {
        this.freeWild.string = "*" + value.toString();
    }

    EnableBtn(isShow: boolean) {
        this.block.active = !isShow;
        this.node.getComponentInChildren(Button).interactable = isShow;
    }

    protected onDestroy(): void {
        EventManager.UnRegister("ChangeBuyValue", this.ChangeBuyValue.bind(this));
        EventManager.UnRegister("ShowNode", this.ShowNode.bind(this));
        EventManager.UnRegister("ChangeFreeNum", this.ChangeFreeNum.bind(this));
        EventManager.UnRegister("ChangeFreeWild", this.ChangeFreeWild.bind(this));
    }
}
