import { _decorator, CCInteger, Component, Node, Sprite, SpriteFrame } from 'cc';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('ContentManager')
export class ContentManager extends Component {
    @property(SpriteFrame)
    normalSf: SpriteFrame = null;

    @property(SpriteFrame)
    successSF: SpriteFrame = null;

    @property(CCInteger)
    index: number;
    start() {

    }

    render() {
        const curIndex = DataManager.Instance.H2AData.findIndex(i => i === this.index);
        const answerIndex = DataManager.Instance.H2AAnswer.findIndex(i => i === this.index);
        this.getComponent(Sprite).spriteFrame = curIndex === answerIndex ? this.successSF : this.normalSf

    }

    update(deltaTime: number) {

    }
}

