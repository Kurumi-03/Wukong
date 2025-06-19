import { _decorator, Color, Component, instantiate, Label, Node, Prefab, ToggleContainer } from 'cc';
import { DataManager } from '../Manager/DataManager';
import { RecordItem } from '../Prefab/RecordItem';
const { ccclass, property } = _decorator;

@ccclass('Record')
export class Record extends Component {
    @property(Node)
    itemParent: Node | null = null;

    @property(Prefab)
    recordItem: Prefab | null = null;

    @property(Label)
    dateLabel: Label | null = null;

    @property(Node)
    tip: Node | null = null;

    @property(Node)
    date: Node | null = null;

    @property(ToggleContainer)
    group: ToggleContainer | null = null;

    protected start(): void {
        this.AddItem();
        this.tip.active = this.itemParent.children.length == 0 ? true : false;
        this.date.active = false;
    }

    AddItem() {
        const infos = DataManager.Instance(DataManager).recordInfos;
        for (let i = 0; i < infos.length; i++) {
            const item = instantiate(this.recordItem);
            this.itemParent.addChild(item);
            item.getComponent(RecordItem).UpdateItem(infos[i], i);
        }
    }

    SelectDate() {
        let children = this.group.toggleItems;
        for (let i = 0; i < children.length; i++) {
            if (children[i].isChecked) {
                children[i].getComponentInChildren(Label).color = Color.BLACK;
            }
            else {
                children[i].getComponentInChildren(Label).color = Color.WHITE;
            }
        }
    }

    ShowDate(){
        this.date.active = true;
    }

    CloseDate(){
        this.date.active = false;
    }
}


