import {images} from "../../images";
import * as key from './key'
var mainMenuData = null;
export default class MainMenuData {
    constructor() {
        if (!mainMenuData) {
            mainMenuData = this;
        }
        this.data = this.initData();
        return mainMenuData;
    }

    getData() {
        return this.data;
    }

    initData() {
        return [
            {
                icon: images.boi_ten,
                id: key.BOI_TEN
            }
        ]
    }
}
