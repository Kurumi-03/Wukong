import {
    _decorator,
    Component,
    instantiate,
    Layout,
    Node,
    Prefab,
    ScrollView
} from 'cc';
import { WinItem } from '../Prefab/WinItem';
import { ResourcesManager } from '../Manager/ResourcesManager';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('WinHistory')
export class WinHistory extends Component {
    @property(ScrollView)
    view: ScrollView | null = null;

    @property(Node)
    parentNode: Node | null = null;

    @property(Prefab)
    winItem: Prefab | null = null; 

    protected onLoad(): void {
        EventManager.Register("AddWinItem", this.AddItem.bind(this));
        EventManager.Register("ClearWinItem", this.ClearItem.bind(this));
    }

    //可在此处插入一些空节点占位
    AddItem(iconNum: number, count: number, score: number) {
        let item = instantiate(this.winItem);
        item.getComponent(WinItem).InitData(ResourcesManager.Instance(ResourcesManager).iconArray[iconNum], count, score);
        this.parentNode.addChild(item);
        this.parentNode.getComponent(Layout).updateLayout();
        this.view.scrollToTop(0.5);
    }

    //清理显示
    ClearItem() {
        for (let i = 0; i < this.parentNode.children.length; i++) {
            this.parentNode.children[i].destroy();
        }
    }

    protected onDestroy(): void {
        EventManager.UnRegister("AddWinItem", this.AddItem.bind(this));
        EventManager.UnRegister("ClearWinItem", this.ClearItem.bind(this));
    }
}
