import {Controller} from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

export default class ProjectBoardController extends Controller {
    async initialize() {
        this.component = await getComponent(this.element);

        document.querySelectorAll('.issue-container').forEach(issueContainer => {
            issueContainer.ondrop = (e) => {
                e.preventDefault();

                let target = e.target;

                if (!target.classList.contains('issue-container')) {
                    target = e.target.parentElement;
                }

                const id = e.dataTransfer.getData('text/plain');

                this.component.action('updateIssueStatus', { id: id, status: target.dataset['status'] });

                target.appendChild(document.getElementById(id));
            }

            issueContainer.ondragover = (e) => {
                e.preventDefault();
            }
        });

        document.querySelectorAll('.issue-item').forEach(issueItem => {
            issueItem.addEventListener('dragstart', (e) => {
                e.dataTransfer.dropEffect = "move";
                e.dataTransfer.setData('text/plain', e.target.id);
            })
        });
    }
}