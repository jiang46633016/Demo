import { _decorator, Component, Node, Scene, SceneGlobals } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum/Index';
const { ccclass, property } = _decorator;

@ccclass('H1SceneManager')
export class H1SceneManager extends SceneManager{
    type: SceneEnum = SceneEnum.H1;
    start() {

    }

    update(deltaTime: number) {
        
    }
}

