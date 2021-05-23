import { Router } from 'express';
import indexRouter from './indexRouter';

const routes: [string, Router][] = [['/', indexRouter]];

export default routes;
