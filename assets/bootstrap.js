import { startStimulusApp } from '@symfony/stimulus-bundle';
import IssueController from "./controllers/issue_controller.js";
import ModalAddPeopleController from "./controllers/modal_add_people_controller.js";
import ProjectBoardController from "./controllers/project_board_controller.js";

export const app = startStimulusApp();

app.register('issue', IssueController);
app.register('modal-add-people', ModalAddPeopleController);
app.register('project-board', ProjectBoardController);