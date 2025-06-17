import {
    _decorator, Button, Component, Node, Sprite, }
from 'cc';
import {
    ResourcesManager
}
from '../Manager/ResourcesManager';
const {
    ccclass, property
}
= _decorator;

@ccclass('FastBtn') export class FastBtn extends Component {
    @property(Sprite) img: Sprite | null = null;

    @property(Node) fastNode: Node | null = null;

    isFast: boolean = false;

    protected start():void {
        this.img.spriteFrame = ResourcesManager.Instance(ResourcesManager).fastBtnImg[0];
        this.fastNode.active = false;
    }

    ChangeFast() {
        this.isFast = !this.isFast;
        this.img.spriteFrame = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast)];
        this.fastNode.active = this.isFast;

        let btn = this.node.getComponent(Button);
        btn.normalSprite = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast)];
        btn.hoverSprite = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast)+2];
    }

}
