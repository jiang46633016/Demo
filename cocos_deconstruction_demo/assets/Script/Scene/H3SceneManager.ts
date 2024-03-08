import { _decorator, Component, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum/Index';
const { ccclass, property } = _decorator;

@ccclass('H3SceneManager')
export class H3SceneManager extends SceneManager {
    type: SceneEnum = SceneEnum.H3;
    start() {

    }

    update(deltaTime: number) {
        
    }
}

