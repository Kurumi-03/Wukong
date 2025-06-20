import { _decorator, Component, instantiate, Label, Node, Prefab, sp, Sprite } from 'cc';
import { ConstManager } from '../Manager/ConstManager';
import { ResourcesManager } from '../Manager/ResourcesManager';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('DoubleIcon')
export class DoubleIcon extends Component {
    @property(Sprite)
    img: Sprite | null = null;

    @property(sp.Skeleton)
    effect: sp.Skeleton | null = null;

    @property(Label)
    num: Label | null = null;

    @property(sp.Skeleton)
    startEffect: sp.Skeleton | null = null;

    doubleIndex: number = 0// 0为绿色 <10
    double: number = 0;//记录倍率

    //加倍圖標的显示
    DoubleShow(index: number) {
        const data = index - 10;//得到倍率
        this.double = data;
        if (data < 10) {
            this.doubleIndex = 0;
        }
        else if (data < 20) {
            this.doubleIndex = 1;
        }
        else if (data < 100) {
            this.doubleIndex = 2;
        }
        else if (data >= 100) {
            this.doubleIndex = 3;
        }
        this.num.string = "*" + data;
        this.img.spriteFrame = ResourcesManager.Instance(ResourcesManager).iconArray[10 + this.doubleIndex];
        //加倍图标是有出场效果的
        EventManager.Send("SummonAction");
        this.startEffect.node.active = true;
        this.startEffect.setAnimation(0, ConstManager.startDoubleEffectName[this.doubleIndex], false);
        this.startEffect.setCompleteListener(()=>{
            console.log("动画执行完毕");
            this.startEffect.node.active = false;
        });

    }

    DoubleDrop(call) {
        this.img.node.active = false;
        this.effect.setAnimation(0, ConstManager.multipleDropName[this.doubleIndex], false);
        this.effect.setCompleteListener(() => {
            call();
        });
    }

    //加倍的效果
    DoubleEffect(call) {
        this.num.node.active = false;
        this.effect.setAnimation(0, ConstManager.multipleEfffectName[this.doubleIndex], false);
        this.effect.setCompleteListener(() => {
            call();
        });
    }
}


