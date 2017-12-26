import {images} from "../../images";
import * as key from './key'
var boitenMenu = null;
export default class BoiTenMenu {
    constructor() {
        if (!boitenMenu) {
            boitenMenu = this;
        }
        this.data = this.initData();
        return boitenMenu;
    }

    getData() {
        return this.data;
    }

    initData() {
        return [
            {
                type: 'YNT',
                name: 'Xem chỉ Tên'
            },
            {
                type: 'YNT',
                name: 'Xem Tên Đệm + Tên'
            },
            {
                type: 'YNT',
                name: 'Xem đầy đủ Họ Tên'
            },
            {
                type: 'YNT',
                name: 'Xem tên theo Thần Số Học'
            }
        ]
    }
}
