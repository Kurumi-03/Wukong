import { _decorator, Component, Node, Skeleton, sp } from 'cc';
import { EventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('Charactor')
export class Charactor extends Component {
    @property(sp.Skeleton)
    charactorAc: sp.Skeleton | null = null;

    protected onLoad(): void {
        EventManager.Register("Action", this.Action.bind(this));
    }

    Action() {
        this.charactorAc.setAnimation(0, "stpr_character_action", false);
        this.charactorAc.setCompleteListener((entry) => {
            if (entry.animation.name == "stpr_character_action") {
                this.charactorAc.setAnimation(0, "stpr_character_01", true);
                this.charactorAc.setCompleteListener(null);
            }
        })

    }

    protected onDestroy(): void {
        EventManager.UnRegister("Action", this.Action.bind(this));
    }
}


