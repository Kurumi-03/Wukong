import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { ConstManager } from '../Manager/ConstManager';
import { HistroyItem } from '../Prefab/HistroyItem';
const { ccclass, property } = _decorator;

@ccclass('History')
export class History extends Component {
    @property(Label)
    date: Label | null = null;

    @property(Label)
    id: Label | null = null;

    @property(Prefab)
    itemPrefab: Prefab | null = null;

    @property(Node)
    itemParent: Node | null = null;

    protected start(): void {
        this.ShowHistoryItem();
    }

    ShowHistoryItem() {
        let infos = ConstManager.Instance(ConstManager).historyInfos;
        for (let i = 0; i < infos.length; i++) {
            let item = instantiate(this.itemPrefab);
            this.itemParent.addChild(item);
            item.getComponent(HistroyItem).UpdateInfo(infos[i], i);
        }
    }
}


