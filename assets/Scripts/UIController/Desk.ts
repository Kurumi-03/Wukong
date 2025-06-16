import {
    _decorator, Button, Component, EventTouch, instantiate, Label, Node, Prefab, Sprite
}
    from 'cc';
import {
    ResourcesManager
}
    from '../Manager/ResourcesManager';
import { EventManager } from '../Manager/EventManager';
import { Utils } from '../Use/Utils';
import { DeskItem } from '../Prefab/DeskItem';
import { PageBtn } from '../Prefab/PageBtn';
import { DataManager, DeskInfo } from '../Manager/DataManager';
const {
    ccclass, property
}
    = _decorator;

@ccclass('Desk') export class Desk extends Component {
    @property(Sprite)
    showEmpty: Sprite | null = null;

    @property(Prefab)
    pageBtnPrefab: Prefab | null = null;

    @property(Node)
    pageParent: Node | null = null;

    @property(Prefab)
    deskItemPrefab: Prefab | null = null;

    @property(Node)
    deskItemParent: Node | null = null;

    @property(Label)
    deskInfoNum: Label | null = null;

    @property(Label)
    data1: Label | null = null;

    @property(Label)
    data2: Label | null = null;

    @property(Label)
    data3: Label | null = null;

    @property(Label)
    todayAll: Label | null = null;

    @property(Label)
    totalPercent: Label | null = null;

    @property(Label)
    lastAll: Label | null = null;

    @property(Label)
    lastPercent: Label | null = null;


    isShowEmpty: boolean = false;
    currentPage: number = 0;
    currentItem: DeskInfo = null;

    protected onLoad(): void {
        EventManager.Register("UpdateDeskInfo", this.UpdateDeskInfo.bind(this));
        EventManager.Register("ShowPageItem", this.ShowPageItem.bind(this));
    }

    protected start(): void {
        this.InitData();
    }


    InitData() {
        this.showEmpty.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskEmptyImg[0];
        //初始显示锁定台桌信息
        let deskInfos = DataManager.Instance(DataManager).deskInfos;
        for (let i = 0; i < deskInfos.length; i++) {
            for (let j = 0; j < deskInfos[i].length; j++) {
                //如果有锁定项就选锁定项
                if (deskInfos[i][j].state == 3) {
                    this.UpdateDeskInfo(deskInfos[i][j]);
                    this.currentPage = i;//得到初始在第几页
                    this.currentItem = deskInfos[i][j];
                    this.ShowPageItem(this.currentPage);
                }
            }
            //显示page栏
            let page = instantiate(this.pageBtnPrefab);
            this.pageParent.addChild(page);
            page.getComponentInChildren(Label).string = (i + 1).toString();
            page.getComponent(PageBtn).pageIndex = i;
        }
        //此处需要做没找到的处理
        if (this.currentItem == null) {
            this.currentPage = 0;
            this.currentItem = deskInfos[0][0];
            this.ShowPageItem(this.currentPage);
        }

    }

    OnClickPage(pageIndex: number) {
        this.ShowPageItem(pageIndex);
    }

    ShowPageItem(index: number, isEmpty: boolean = false) {
        this.currentPage = index;
        //每次展示前需要将之前的数据清空
        this.deskItemParent.children.forEach(element => {
            element.destroy();
        });
        let deskInfos = DataManager.Instance(DataManager).deskInfos
        for (let i = 0; i < deskInfos[index].length; i++) {
            if (isEmpty == true) {
                if (deskInfos[index][i].state == 0) {
                    let deskItem = instantiate(this.deskItemPrefab);
                    this.deskItemParent.addChild(deskItem);
                    deskItem.getComponent(DeskItem).UpdateInfo(deskInfos[index][i]);
                }
            }
            else {
                //显示所有item栏
                let deskItem = instantiate(this.deskItemPrefab);
                this.deskItemParent.addChild(deskItem);
                deskItem.getComponent(DeskItem).UpdateInfo(deskInfos[index][i]);
            }
        }
    }

    OnClickShowEmpty() {
        this.isShowEmpty = !this.isShowEmpty;
        this.showEmpty.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskEmptyImg[Number(this.isShowEmpty)];
        if (this.isShowEmpty) {
            this.ShowPageItem(this.currentPage, true);
        }
        else {
            this.ShowPageItem(this.currentPage);
        }
    }



    UpdateDeskInfo(deskInfo: DeskInfo) {
        this.deskInfoNum.string = deskInfo.index.toString();
        this.data1.string = deskInfo.data.data1.toString();
        this.data2.string = deskInfo.data.data2.toString();
        this.data3.string = deskInfo.data.data3.toString();
        this.todayAll.string = Utils.NumberToString(deskInfo.data.todayAll);
        this.totalPercent.string = deskInfo.data.totalPercent.toString() + "%";
        this.lastAll.string = Utils.NumberToString(deskInfo.data.lastAll);
        this.lastPercent.string = deskInfo.data.lastPercent.toString() + "%";
        //更新选中的数据
        this.currentItem = deskInfo;
    }



    protected onDestroy(): void {
        EventManager.UnRegister("UpdateDeskInfo", this.UpdateDeskInfo.bind(this));
        EventManager.UnRegister("ShowPageItem", this.ShowPageItem.bind(this));
    }

    OnClickLock() {
        //将锁定的与选中的进行数据交换和显示转换
        let clock: Node = null;
        let select: Node = null;
        for (let i = 0; i < this.deskItemParent.children.length; i++) {
            if (this.deskItemParent.children[i].getComponent(DeskItem).deskInfo.state == 3) {
                clock = this.deskItemParent.children[i];
            }
            if (this.deskItemParent.children[i].getComponent(DeskItem).deskInfo.index == this.currentItem.index) {
                select = this.deskItemParent.children[i];
            }
        }
        if (clock != null && select != null) {
            clock.getComponent(DeskItem).deskInfo.state = 0;
            select.getComponent(DeskItem).deskInfo.state = 3;
            clock.getComponent(DeskItem).UpdateInfo(null);
            select.getComponent(DeskItem).UpdateInfo(null);
        }
    }

    OnClickConfirm() {
        DataManager.Instance(DataManager).currentDeskIndex = this.currentItem.index;
        EventManager.Send("UpdateDeskIndex");
        this.node.active = false;
    }
}
