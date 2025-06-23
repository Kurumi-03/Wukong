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
import { EventManager } from '../Manager/EventManager';
const {
    ccclass, property
}
    = _decorator;

@ccclass('FastBtn') export class FastBtn extends Component {
    @property(Sprite) img: Sprite | null = null;

    @property(Node) fastNode: Node | null = null;

    private isFast: boolean = false;

    protected onLoad(): void {
        EventManager.Register("AutoFastMode",this.AutoFastMode.bind(this));
    }

    protected start(): void {
        this.img.spriteFrame = ResourcesManager.Instance(ResourcesManager).fastBtnImg[0];
        this.fastNode.active = false;
    }

    ChangeFast() {
        this.img.spriteFrame = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast)];
        this.fastNode.active = this.isFast;
        DataManager.Instance(DataManager).dropWaitTime = this.isFast ? ConstManager.fastDropWaitTime : ConstManager.simpleDropWaitTime;
        
        let btn = this.node.getComponent(Button);
        btn.normalSprite = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast)];
        btn.hoverSprite = ResourcesManager.Instance(ResourcesManager).fastBtnImg[Number(this.isFast) + 2];
    }

    AutoFastMode(_isFast:boolean){
        this.isFast = _isFast;
        this.ChangeFast();
    }
    
    SimpleFaseMode(){
        this.isFast = !this.isFast;
        this.ChangeFast();
    }

    protected onDestroy(): void {
        EventManager.UnRegister("AutoFastMode",this.AutoFastMode.bind(this));
    }

}
