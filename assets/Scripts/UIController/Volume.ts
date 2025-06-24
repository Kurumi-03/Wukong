import { _decorator, Component, Node, Slider } from 'cc';
import { AudioManager } from '../Manager/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('Volume')
export class Volume extends Component {
    @property(Slider)
    bgmSlider: Slider = null;
    @property(Slider)
    sfxSlider: Slider = null;

    protected onLoad(): void {
        // 初始化Slider值
        this.bgmSlider.progress = AudioManager.Instance(AudioManager).bgmVolume;
        this.sfxSlider.progress = AudioManager.Instance(AudioManager).sfxVolume;

        // 绑定事件
        this.bgmSlider.node.on('slide', this.OnBGMVolumeChange, this);
        this.sfxSlider.node.on('slide', this.OnSFXVolumeChange, this);
    }

    private OnBGMVolumeChange(slider: Slider): void {
        AudioManager.Instance(AudioManager).setBGMVolume(slider.progress);
    }

    private OnSFXVolumeChange(slider: Slider): void {
        AudioManager.Instance(AudioManager).setSFXVolume(slider.progress);
    }
}


