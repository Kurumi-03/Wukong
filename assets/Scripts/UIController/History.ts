import { _decorator, Component, instantiate, Label, Node, Prefab, tween, UITransform, Vec3 } from 'cc';
import { HistroyItem } from '../Prefab/HistroyItem';
import { DataManager } from '../Manager/DataManager';
import { EventManager } from '../Manager/EventManager';
import { DatePanel } from './DatePanel';
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

    @property(Node)
    copyTip: Node | null = null;

    @property(DatePanel)
    datePanel: DatePanel | null = null;

    private isMove: boolean = false;//标记提示

    protected onLoad(): void {
        EventManager.Register("UpdateID", this.UpdateID.bind(this));
    }

    protected start(): void {
        this.ShowHistoryItem();
        this.UpdateDate();
        this.datePanel.node.active = false;
    }

    ShowHistoryItem() {
        let infos = DataManager.Instance(DataManager).historyInfos;
        for (let i = 0; i < infos.length; i++) {
            let item = instantiate(this.itemPrefab);
            this.itemParent.addChild(item);
            item.getComponent(HistroyItem).UpdateInfo(infos[i], i);
        }
    }

    OnClickCopyID() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(this.id.string).then(() => {
                let yOffset = this.copyTip.getComponent(UITransform).contentSize.y;
                if (this.isMove == false) {
                    this.isMove = true
                    tween(this.copyTip).by(0.3, {
                        position: new Vec3(0, yOffset)
                    }).delay(1).by(0.3, {
                        position: new Vec3(0, -yOffset)
                    }).call(() => {
                        this.isMove = false;
                    }).start();
                }
            })
        }
    }

    UpdateID(s: string) {
        this.id.string = s;
    }

    UpdateDate() {
        const array = DataManager.Instance(DataManager).date.split("/");
        this.date.string = array[0] + "/" + array[1] + "/" + array[2];
    }

    ShowDatePanel() {
        this.datePanel.node.active = true;
    }

    CloseDatePanel() {
        this.datePanel.node.active = false;
        //退出時做查詢
        const data = this.datePanel.findData;
        console.log(data);
    }


    protected onDestroy(): void {
        EventManager.UnRegister("UpdateID", this.UpdateID.bind(this));
    }
}


