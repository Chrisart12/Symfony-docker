import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

export class IssueController extends Controller {
    /** @type {HTMLButtonElement} */
    buttonActivateEditingDescription = document.querySelector('#buttonActivateEditingDescription');

    /** @type {HTMLButtonElement} */
    buttonAttach = document.querySelector('#buttonAttach');

    /** @type {HTMLInputElement} */
    divIssueDescription = document.querySelector('#issueDescription');

    /** @type {HTMLInputElement} */
    inputAttachment = document.querySelector('#inputAttachment')

    activateEditingDescription() {
        this.buttonActivateEditingDescription.click();
    }

    async updateButtonAttachDisabledState(e) {
        /** @type {FileList} */
        const files = e.target.files;

        this.buttonAttach.disabled = 0 === files.length;
    }

    async initialize() {
        this.component = await getComponent(this.element);

        this.divIssueDescription.addEventListener('click', this.activateEditingDescription.bind(this));

        this.inputAttachment.addEventListener('change', async (e) => {
            await this.updateButtonAttachDisabledState(e);
        });
    }
}
