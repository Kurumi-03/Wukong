import {
    _decorator, Component, Label, Sprite
}
    from 'cc';
import { EventManager } from '../Manager/EventManager';
import { DeskInfo } from '../Manager/ConstManager';
import { ResourcesManager } from '../Manager/ResourcesManager';
const {
    ccclass, property
}
    = _decorator;

@ccclass('DeskItem')
export class DeskItem extends Component {
    @property(Sprite)
    bg: Sprite | null = null;

    @property(Sprite)
    Icon: Sprite | null = null;

    @property(Label)
    num: Label | null = null;

    @property(Label)
    dataPercent: Label | null = null;

    deskInfo: DeskInfo = null;
    // {
    //     isClock: false, isEmpty: true, isClockMe: false, index: 1001, percent: 87.12, data: {
    //         data1: 11,
    //         data2: 12,
    //         data3: 13,
    //         todayAll: 123154,
    //         totalPercent: 123.21,
    //         lastAll: 546531,
    //         lastPercent: 121.1,
    //     }
    // };//每个存储的信息

    protected start(): void {
        // this.UpdateInfo();
    }

    UpdateInfo(info: DeskInfo) {
        this.deskInfo = info;
        this.num.string = this.deskInfo.index.toString();
        this.dataPercent.string = this.deskInfo.percent.toString() + "%";
        if (this.deskInfo.isClockMe) {
            this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[6];
            this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[7];
            return;
        }
        if (this.deskInfo.isClock) {
            this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[4];
            this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[5];
            return;
        }
        if (this.deskInfo.isEmpty) {
            this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[0];
            this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[1];
            return;
        }
        else {
            this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[2];
            this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[3];
            return;
        }
    }


    OnClick() {
        EventManager.Send("UpdateDeskInfo", this.deskInfo);
    }
}
