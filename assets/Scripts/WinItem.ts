import {
    _decorator,
    Component,
    Label,
    labelAssembler,
    Node,
    Sprite,
    SpriteFrame
} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('WinItem')
export class WinItem extends Component {
    @property(Sprite)
    icon : Sprite | null = null;

    @property(Label)
    count : Label | null = null;

    @property(Label)
    score : Label | null = null;

    InitData(_icon:SpriteFrame,_count:number,_score:number){
        this.icon.spriteFrame = _icon;
        this.count.string = _count.toString();
        this.score.string = _count.toString();
    }
}
