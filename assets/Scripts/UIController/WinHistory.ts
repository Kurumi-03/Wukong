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
const {ccclass, property} = _decorator;

@ccclass('WinHistory')
export class WinHistory extends Component {
    @property(ScrollView)
    view : ScrollView | null = null;

    @property(Node)
    parentNode : Node | null = null;

    @property(Prefab)
    winItem : Prefab | null = null;

    //可在此处插入一些空节点占位
    AddItem(iconNum : number, count : number, score : number) {
        let item = instantiate(this.winItem);
        item.getComponent(WinItem).InitData(ResourcesManager.Instance(ResourcesManager).iconArray[iconNum], count, score);
        this.parentNode.addChild(item);
        this.parentNode.getComponent(Layout).updateLayout();
        this.view.scrollToTop(0.5);
    }
}
