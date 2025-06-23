import { _decorator, Button, Component, Label, Node, Sprite } from 'cc';
import { BtnBlock } from './BtnBlock';
import { BetBtn } from './BetBtn';
import { PlayBtn } from './PlayBtn';
import { EventManager } from '../Manager/EventManager';
import { LeftNode } from './LeftNode';
import { DataManager } from '../Manager/DataManager';
import { ResourcesManager } from '../Manager/ResourcesManager';
const { ccclass, property } = _decorator;

@ccclass('BottomRoot')
export class BottomRoot extends Component {
    @property(BtnBlock)
    menuBtn: BtnBlock | null = null;

    @property(BtnBlock)
    autoBtn: BtnBlock | null = null;

    @property(BtnBlock)
    fastBtn: BtnBlock | null = null;

    @property(BtnBlock)
    deskBtn: BtnBlock | null = null;

    @property(BetBtn)
    BetBtn: BetBtn | null = null;

    @property(PlayBtn)
    playBtn: PlayBtn | null = null;

    @property(LeftNode)
    leftNode: LeftNode | null = null;

    protected onLoad(): void {
        EventManager.Register("UpdateDeskIndex", this.UpdateDeskIndex.bind(this));
        EventManager.Register("EnableAllBtn", this.EnableAllBtn.bind(this));
        EventManager.Register("EnableAutoBtn", this.EnableAutoBtn.bind(this));
        // EventManager.Register("ChangeAutoImg", this.ChangeAutoImg.bind(this));
    }

    protected start(): void {
        this.UpdateDeskIndex();
        this.ChangeAutoImg(false);
    }

    EnableAllBtn(isShow: boolean) {
        //在免费游戏模式下不会解除按钮禁用
        if (DataManager.Instance(DataManager).freeCount > 0) {
            isShow = false;
        }
        this.menuBtn.EnableBtn(isShow);
        this.autoBtn.EnableBtn(isShow);
        this.fastBtn.EnableBtn(isShow);
        this.deskBtn.EnableBtn(isShow);
        this.BetBtn.EnableBtn(isShow);
        this.playBtn.EnableBtn(isShow);
        this.leftNode.EnableBtn(isShow);
    }

    EnableAutoBtn(isShow: boolean) {
        this.menuBtn.EnableBtn(isShow);
        this.fastBtn.EnableBtn(isShow);
        this.deskBtn.EnableBtn(isShow);
        this.BetBtn.EnableBtn(isShow);
        this.playBtn.EnableBtn(isShow);
        this.leftNode.EnableBtn(isShow);
        this.ChangeAutoImg(!isShow);
    }

    UpdateDeskIndex() {
        this.deskBtn.node.getComponentInChildren(Label).string = DataManager.Instance(DataManager).currentDeskIndex.toString();
    }

    CancelAutoPlay() {
        //只有在自动模式下次功能才会执行
        if (DataManager.Instance(DataManager).autoCount > 0) {
            DataManager.Instance(DataManager).autoCount = 0;
            EventManager.Send("PlayBtnAutoMode", false);
            this.ChangeAutoImg(false);
        }
    }

    ChangeAutoImg(isShow: boolean) {
        let img = this.autoBtn.getComponent(Button);
        img.normalSprite = ResourcesManager.Instance(ResourcesManager).autoBtnImg[Number(isShow)];
        img.hoverSprite = ResourcesManager.Instance(ResourcesManager).autoBtnImg[Number(isShow) + 2];
    }

    protected onDestroy(): void {
        EventManager.UnRegister("UpdateDeskIndex", this.UpdateDeskIndex.bind(this));
        EventManager.UnRegister("EnableAllBtn", this.EnableAllBtn.bind(this));
        EventManager.UnRegister("EnableAutoBtn", this.EnableAutoBtn.bind(this));
        // EventManager.UnRegister("ChangeAutoImg", this.ChangeAutoImg.bind(this));
    }
}
