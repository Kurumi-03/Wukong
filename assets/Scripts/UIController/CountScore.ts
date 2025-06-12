import {
    _decorator,
    Component,
    Label,
} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('CountScore')
export class CountScore extends Component {
    @property(Label)
    winScore : Label | null = null;

    @property(Label)
    playerScore : Label | null = null;

    winNum:number = 0;
    playerNum:number = 0;

    protected start(): void {
        this.winScore.string = this.winNum.toString();
        this.playerScore.string = this.playerNum.toString();
    }

    UpdateWinScore(data:number){
        this.winNum = data;
        this.winScore.string = data.toString();
    }
    
    UpdatePlayerScore(data:number){
        this.playerNum = data;
        this.playerScore.string = data.toString();
    }
}
