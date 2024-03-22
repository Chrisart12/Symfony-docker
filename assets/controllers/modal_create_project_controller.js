import {Controller} from '@hotwired/stimulus';
import {Modal} from 'bootstrap';

export default class ModalCreateProjectController extends Controller {
    /** @type {Modal|null} **/
    modal = null;

    connect() {
        document.addEventListener('project:modal:close', () => this.modal.hide());
    }

    initialize() {
        this.modal = Modal.getOrCreateInstance(this.element);
    }
}