import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
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

    protected start(): void {
        this.AddItem();
        this.tip.active = this.itemParent.children.length == 0 ? true : false;
    }

    AddItem() {
        const infos = DataManager.Instance(DataManager).recordInfos;
        for (let i = 0; i < infos.length; i++) {
            const item = instantiate(this.recordItem);
            this.itemParent.addChild(item);
            item.getComponent(RecordItem).UpdateItem(infos[i], i);
        }
    }
}


