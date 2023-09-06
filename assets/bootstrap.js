import { startStimulusApp } from '@symfony/stimulus-bridge';
import { IssueController } from "./controllers/issue_controller";
import {ModalAddPeopleController} from "./controllers/modal_add_people_controller";
import { ModalCreateProjectController } from "./controllers/modal_create_project_controller";
import { NavbarController } from "./controllers/navbar_controller";
import {ProjectBoardController} from "./controllers/project_board_controller";

export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!./controllers',
    true,
    /\.[jt]sx?$/
));

app.register('issue', IssueController);
app.register('modal-add-people', ModalAddPeopleController);
app.register('modal-create-project', ModalCreateProjectController);
app.register('project-board', ProjectBoardController);
app.register('navbar', NavbarController);