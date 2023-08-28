import { Controller } from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

export class IssueController extends Controller {
    async initialize() {
        this.component = await getComponent(this.element);
    }
}
