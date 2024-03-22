import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

class IssueController extends Controller {
    /** @type {HTMLButtonElement} */
    buttonActivateEditingDescription = document.querySelector('#buttonActivateEditingDescription');

    /** @type {HTMLButtonElement} */
    buttonAttach = document.querySelector('#buttonAttach');

    /** @type {HTMLInputElement} */
    divIssueDescription = document.querySelector('#issueDescription');

    activateEditingDescription() {
        document.querySelector('#buttonActivateEditingDescription').click();
    }

    async updateButtonAttachDisabledState(e) {
        /** @type {FileList} */
        const files = e.target.files;

        this.buttonAttach.disabled = 0 === files.length;
    }

    async initialize() {
        this.component = await getComponent(this.element);

        this.component.on('render:finished', (component) => {
            const divIssueDescription = component.element.querySelector('#issueDescription');

            if (null !== divIssueDescription) {
                divIssueDescription.addEventListener('click', this.activateEditingDescription.bind(this));
            }
        });

        this.divIssueDescription.addEventListener('click', this.activateEditingDescription.bind(this));

        document.querySelector('#inputAttachment').addEventListener('change', async (e) => {
            await this.updateButtonAttachDisabledState(e);
        });
    }
}

export { IssueController as default };