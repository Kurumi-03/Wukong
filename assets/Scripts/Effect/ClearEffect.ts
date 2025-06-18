import { _decorator, Component, Node, Skeleton, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClearEffect')
export class ClearEffect extends Component {
    @property(sp.Skeleton)
    ske: sp.Skeleton | null = null;

    protected start(): void {
        this.ske.setAnimation(0, "ReadyLaser", true);
    }

    DestoryEffect(){
        this.ske.setAnimation(0, "Destory", false);
        this.ske.setCompleteListener(()=>{
            this.node.destroy();
        })
    }
}


