import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

export class IssueController extends Controller {
    /** @type {HTMLInputElement} */
    inputAttachment;

    async addAttachment(e) {
        /** @type {FileList} */
        const files = e.target.files;

        if (0 === files.length) {
            return;
        }

        const formData = new FormData();
        formData.append('attachment', files[0]);


        const response = await fetch(`/issues/${this.component.getData('issue')}/attachments`, {
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
            method: 'POST'
        });

        const attachment = await response.json();

        await this.component.action('addAttachment', attachment);
    }

    async initialize() {
        this.component = await getComponent(this.element);
        this.inputAttachment = document.querySelector('#inputAttachment');

        this.inputAttachment.addEventListener('change', async (e) => {
            await this.addAttachment(e);
        });
    }

    openFileDialog() {
        this.inputAttachment.click();
    }
}
