import {Controller} from '@hotwired/stimulus';
import {Modal} from 'bootstrap';

export class NavbarController extends Controller {
    initialize() {
        this.element.querySelector('#anchorCreateIssue').addEventListener('click', async(e) => {
            e.preventDefault();

            const response = await fetch('/issues/create');

            document.querySelector('#modals').innerHTML = await response.text();

            const modal = new Modal(document.querySelector('#modalCreateIssue'));

            modal.show();
        })
    }
}