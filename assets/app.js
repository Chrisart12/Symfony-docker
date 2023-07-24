import { registerReactControllerComponents } from '@symfony/ux-react';

import './bootstrap.js';

import './styles/app.css';

import 'flowbite';

registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));