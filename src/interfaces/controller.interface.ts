import { NextFunction, Request, Response } from "express";

/**
 * Definition of CRUDL data operations of persistent storage that defines
 * routes and mapping HTTP methods.
 */
export interface IController {
  /** Adds record(s) to one or more tables in a database. */
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  /** Returns a result from a set of rows within table(s). */
  read(req: Request, res: Response, next: NextFunction): Promise<void>;
  /** Changes data of one or more records in table(s). */
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  /** Removes one or more records in a table(s). */
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
  /** Returns a list of results from table(s) based on a condition. */
  list?(req: Request, res: Response, next: NextFunction): Promise<void>;
}
