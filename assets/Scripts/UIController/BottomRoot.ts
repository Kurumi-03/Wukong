import {_decorator, Component, Node} from 'cc';
import { BtnBlock } from './BtnBlock';
import { BetBtn } from './BetBtn';
import { PlayBtn } from './PlayBtn';
const {ccclass, property} = _decorator;

@ccclass('BottomRoot')
export class BottomRoot extends Component {
    @property(BtnBlock)
    menuBtn : BtnBlock | null = null;

    @property(BtnBlock)
    autoBtn : BtnBlock | null = null;

    @property(BtnBlock)
    fastBtn : BtnBlock | null = null;

    @property(BetBtn)
    BetBtn : BetBtn | null = null;

    @property(PlayBtn)
    playBtn : PlayBtn | null = null;

    DisableAllBtn(){
        this.menuBtn.DisableBtn();
        this.autoBtn.DisableBtn();
        this.fastBtn.DisableBtn();
        this.BetBtn.DisableBtn();
    }

    EnableAllBtn(){
        this.menuBtn.EnableBtn();
        this.autoBtn.EnableBtn();
        this.fastBtn.EnableBtn();
        this.BetBtn.EnableBtn();
    }

    FastMode(){
        
    }
}
