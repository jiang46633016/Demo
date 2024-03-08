import { _decorator, Component, director, Node, Scene } from 'cc';
import { SceneEnum } from '../Enum/Index';
import DataManager from '../Runtime/DataManager';
import { SceneManager } from '../Scene/SceneManager';
const { ccclass, property } = _decorator;

@ccclass('MenuManager')
export class MenuManager extends SceneManager {

    handleBackMenu() {
        DataManager.Instance.reset();
        director.loadScene(SceneEnum.Menu);
    }
    handleContinueGame() {
        DataManager.Instance.reset();
        director.loadScene(DataManager.Instance.curScene);
    }
    
    render() {

    }
}

