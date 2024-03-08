import { _decorator, Component, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum/Index';
const { ccclass, property } = _decorator;

@ccclass('H2AManager')
export class H2AManager extends SceneManager {
    type: SceneEnum = SceneEnum.H2A;
    start() {

    }

    update(deltaTime: number) {
        
    }
}

