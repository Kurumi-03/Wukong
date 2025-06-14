import { _decorator, CCFloat, Component, tween, Tween, Vec3 } from 'cc';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('PageBtn')
export class PageBtn extends Component {
    @property(CCFloat)
    changeTime: number = 0;
    
    @property(CCFloat)
    changeScale: number = 0;
    
    private scaleTween: Tween = null;
    pageIndex:number = 0;

    OnClickPage() {
        EventManager.Send("ShowPageItem",this.pageIndex);
        if (this.scaleTween) {
            this.scaleTween.stop();
        }
        this.scaleTween = tween(this.node).to(this.changeTime, {
            scale: new Vec3(this.changeScale, this.changeScale,this.changeScale)
        }).start();
    }
}


