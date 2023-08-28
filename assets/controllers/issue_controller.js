import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

export class IssueController extends Controller {
    /** @type {HTMLButtonElement} */
    buttonAttach;

    /** @type {HTMLInputElement} */
    inputAttachment;

    async updateButtonAttachDisabledState(e) {
        /** @type {FileList} */
        const files = e.target.files;

        this.buttonAttach.disabled = 0 === files.length;
    }

    async initialize() {
        this.component = await getComponent(this.element);
        this.buttonAttach = document.querySelector('#buttonAttach');
        this.inputAttachment = document.querySelector('#inputAttachment');

        this.inputAttachment.addEventListener('change', async (e) => {
            await this.updateButtonAttachDisabledState(e);
        });
    }
}
