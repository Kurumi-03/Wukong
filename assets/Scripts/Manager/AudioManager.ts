import { _decorator, AudioClip, AudioSource } from 'cc';
import Singleton from '../Use/Singleton';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Singleton<AudioManager> {
    protected onLoad(): void {
        AudioManager._instance = this;
    }

    // 双通道音频源
    @property(AudioSource)
    private bgmSource: AudioSource = null;
    @property(AudioSource)
    private sfxSource: AudioSource = null;

    @property(AudioClip)
    bgmClip: AudioClip[] = [];

    @property(AudioClip)
    effectClip: AudioClip[] = [];

    // 音量默认值
    bgmVolume: number = 0.5;
    sfxVolume: number = 0.5;

    // 背景音乐控制
    public playBGM(name: string, loop: boolean = true): void {
        const clip = this.bgmClip.find(n => n.name === name);
        if (clip) {
            this.bgmSource.stop();
            this.bgmSource.clip = clip;
            this.bgmSource.loop = loop;
            this.bgmSource.volume = this.bgmVolume;
            this.bgmSource.play();
        }
    }

    // 音效播放
    public playSFX(name: string, volumeScale: number = 1): void {
        const clip = this.bgmClip.find(n => n.name === name);
        if (clip) {
            this.sfxSource.playOneShot(clip, this.sfxVolume * volumeScale);
        }
    }

    // 音量设置接口
    public setBGMVolume(volume: number): void {
        this.bgmVolume = Math.min(1, Math.max(0, volume));
        this.bgmSource.volume = this.bgmVolume;
    }

    public setSFXVolume(volume: number): void {
        this.sfxVolume = Math.min(1, Math.max(0, volume));
    }
}


