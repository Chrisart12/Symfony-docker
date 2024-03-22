import { startStimulusApp } from '@symfony/stimulus-bundle';
import IssueController from "./controllers/issue_controller.js";
import ModalAddPeopleController from "./controllers/modal_add_people_controller.js";
import ModalCreateProjectController from "./controllers/modal_create_project_controller.js";
import NavbarController from "./controllers/navbar_controller.js";
import ProjectBoardController from "./controllers/project_board_controller.js";

export const app = startStimulusApp();

app.register('issue', IssueController);
app.register('modal-add-people', ModalAddPeopleController);
app.register('modal-create-project', ModalCreateProjectController);
app.register('project-board', ProjectBoardController);
app.register('navbar', NavbarController);