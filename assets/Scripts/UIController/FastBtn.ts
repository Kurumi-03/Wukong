import {
    _decorator, Button, Component, Node, Sprite,
}
    from 'cc';
import {
    ResourcesManager
}
    from '../Manager/ResourcesManager';
import { DataManager } from '../Manager/DataManager';
import { ConstManager } from '../Manager/ConstManager';
const {
    ccclass, property
}
    = _decorator;

@ccclass('FastBtn') export class FastBtn extends Component {
    @property(Sprite) img: Sprite | null = null;

    @property(Node) fastNode: Node | null = null;

    private isFast: boolean = false;

    protected start(): void {
        this.img.spriteFrame = ResourcesManager.Instance(ResourcesManager).fastBtnImg[0];
        this.fastNode.active = false;
    }

    ChangeFast() {
        this.isFast = !this.isFast;
        this.img.spriteFrame = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast)];
        this.fastNode.active = this.isFast;
        DataManager.Instance(DataManager).dropWaitTime = this.isFast ? ConstManager.fastDropWaitTime : ConstManager.simpleDropWaitTime;

        let btn = this.node.getComponent(Button);
        btn.normalSprite = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast)];
        btn.hoverSprite = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast) + 2];
    }

}
