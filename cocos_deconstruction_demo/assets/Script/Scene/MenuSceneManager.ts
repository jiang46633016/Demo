import { _decorator, Component, director, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum/Index';
const { ccclass, property } = _decorator;

@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager {

    handleNewGame() {
        director.loadScene(SceneEnum.H1)  
    }

    handleNewContinue() {

    }

    render() {

    }
}

