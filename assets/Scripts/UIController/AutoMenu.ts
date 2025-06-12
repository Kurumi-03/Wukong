import {
    _decorator,
    Component,
    Label,
    Node,
    Toggle
} from 'cc';
import {ConstManager} from '../Manager/ConstManager';
const {ccclass, property} = _decorator;

@ccclass('AutoMenu')
export class AutoMenu extends Component {
    @property(Toggle)
    fastMode : Toggle | null = null;

    @property(Toggle)
    free : Toggle | null = null;

    @property(Label)
    betCount : Label | null = null;

    currentCount : number = 0;
    currentIndex : number = 0;

    isFast:boolean = false;
    isFree:boolean = false;

    protected start(): void {
        let array = ConstManager.Instance(ConstManager).countArray;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
        this.fastMode.isChecked = this.isFast;
        this.free.isChecked = this.isFree;
    }

    AutoPlay() {

    }

    Add() {
        let array = ConstManager.Instance(ConstManager).countArray;
        if (this.currentIndex >= array.length-1) 
            return;
        this.currentIndex ++;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
    }

    Delete() {
        let array = ConstManager.Instance(ConstManager).countArray;
        if (this.currentIndex <= 0) 
            return;
        this.currentIndex --;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
    }

    FastMode(){
        this.isFast = !this.isFast;
        console.log(this.isFast);
    }

    Free(){
        this.isFree = !this.isFree;
        console.log(this.isFree);
    }
}
