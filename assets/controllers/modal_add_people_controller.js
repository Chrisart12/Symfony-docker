import { Controller } from '@hotwired/stimulus';
import { Modal } from 'bootstrap';
import { getComponent } from '@symfony/ux-live-component';

import TomSelect from 'tom-select';

export class ModalAddPeopleController extends Controller {
    /** @type {Modal|null} **/
    modal = null;

    /** @type {TomSelect} **/
    selectPeople;

    addPeople() {
        const people = this.selectPeople.getValue();

        this.component.action('addPeople', { people: people });
    }

    connect() {
        document.addEventListener('people:modal:close', () => this.modal.hide());
    }

    async initialize() {
        this.component = await getComponent(this.element);

        this.modal = Modal.getOrCreateInstance(this.element);

        this.selectPeople = new TomSelect('#selectPeople', {
            create: true,
            persist: false,
            maxItems: 10,
            plugins: ['remove_button']
        });

        document.querySelector('#buttonAddPeople').addEventListener('click', this.addPeople.bind(this));
    }
}