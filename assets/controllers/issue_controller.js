import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

export class IssueController extends Controller {
    /** @type {HTMLButtonElement} */
    buttonActivateEditingDescription;

    /** @type {HTMLButtonElement} */
    buttonAttach;

    /** @type {HTMLInputElement} */
    divIssueDescription;

    /** @type {HTMLInputElement} */
    inputAttachment;

    async updateButtonAttachDisabledState(e) {
        /** @type {FileList} */
        const files = e.target.files;

        this.buttonAttach.disabled = 0 === files.length;
    }

    async initialize() {
        this.component = await getComponent(this.element);
        this.buttonActivateEditingDescription = document.querySelector('#buttonActivateEditingDescription');
        this.buttonAttach = document.querySelector('#buttonAttach');
        this.divIssueDescription = document.querySelector('#issueDescription');
        this.inputAttachment = document.querySelector('#inputAttachment');

        this.divIssueDescription.addEventListener('click',  () => {
            this.buttonActivateEditingDescription.click();
        });

        this.inputAttachment.addEventListener('change', async (e) => {
            await this.updateButtonAttachDisabledState(e);
        });
    }
}
