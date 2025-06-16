import {
    _decorator, Component, Label, Sprite
}
    from 'cc';
import { EventManager } from '../Manager/EventManager';
import { ResourcesManager } from '../Manager/ResourcesManager';
import { DeskInfo } from '../Manager/DataManager';
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

    protected start(): void {

    }

    UpdateInfo(info: DeskInfo) {
        //不传值时直接使用自身参数
        if (info != null) {
            this.deskInfo = info;
        }
        this.num.string = this.deskInfo.index.toString();
        this.dataPercent.string = this.deskInfo.percent.toString() + "%";

        switch (this.deskInfo.state) {
            case 0:
                this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[0];
                this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[1];
                break;
            case 1:
                this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[2];
                this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[3];
                break;
            case 2:
                this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[4];
                this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[5];
                break;
            case 3:
                this.bg.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[6];
                this.Icon.spriteFrame = ResourcesManager.Instance(ResourcesManager).deskItemImg[7];
                break;
            default:
                break;
        }
    }


    OnClick() {
        EventManager.Send("UpdateDeskInfo", this.deskInfo);
    }
}
