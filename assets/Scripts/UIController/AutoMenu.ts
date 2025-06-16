import {
    _decorator,
    Component,
    Label,
    Node,
    Toggle
} from 'cc';
import { EventManager } from '../Manager/EventManager';
import { DataManager } from '../Manager/DataManager';
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

    protected onLoad(): void {
        EventManager.Register("AutoPlay",this.AutoPlay.bind(this));
    }

    protected start(): void {
        let array = DataManager.Instance(DataManager).countArray;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
        this.fastMode.isChecked = this.isFast;
        this.free.isChecked = this.isFree;
    }

    AutoPlay() {

    }

    Add() {
        let array = DataManager.Instance(DataManager).countArray;
        if (this.currentIndex >= array.length-1) 
            return;
        this.currentIndex ++;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
    }

    Delete() {
        let array = DataManager.Instance(DataManager).countArray;
        if (this.currentIndex <= 0) 
            return;
        this.currentIndex --;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
    }

    FastMode(){
        this.isFast = !this.isFast;
    }

    Free(){
        this.isFree = !this.isFree;
    }

    protected onDestroy(): void {
        EventManager.UnRegister("AutoPlay",this.AutoPlay.bind(this));
    }
}
