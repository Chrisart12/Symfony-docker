import {Controller} from '@hotwired/stimulus';
import {Modal} from 'bootstrap';

export class NavbarController extends Controller {
    /** @type {Modal|null} **/
    modal = null;

    connect() {
        document.addEventListener('issue:modal:close', () => this.modal.hide());
    }

    initialize() {
        this.element.querySelector('#anchorCreateIssue').addEventListener('click', async(e) => {
            e.preventDefault();

            const response = await fetch('/issues/create');

            document.querySelector('#modals').innerHTML = await response.text();

            this.modal = new Modal(document.querySelector('#modalCreateIssue'));

            this.modal.show();
        });
    }
}