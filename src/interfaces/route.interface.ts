import { Router } from "express";

/** Route definition that interfaces with nodeJS Express middleware. */
export interface IRoute {
  /** Base path of the API URL. */
  path?: string;
  /** Express' middleware mapping of REST API routing. */
  router: Router;
}
