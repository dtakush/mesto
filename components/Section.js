import {Card} from './Card.js';

export class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(element) {
        this._container.append(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
          });
    }
}