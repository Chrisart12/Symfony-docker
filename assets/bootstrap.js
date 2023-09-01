import { startStimulusApp } from '@symfony/stimulus-bridge';
import {IssueController} from "./controllers/issue_controller";
import {NavbarController} from "./controllers/navbar_controller";

export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!./controllers',
    true,
    /\.[jt]sx?$/
));

app.register('issue', IssueController);
app.register('navbar', NavbarController);