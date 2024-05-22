/**
 * Services encapsulate the core business logic that interacts directly with
 * the data access layer. Each table in the database will have its own service
 * application layer.
 */
export default interface IService {
  /**
   * Inserts a record into the database.
   *
   * @param body - The input body
   * @returns The created record
   */
  insertRecord(body: any): Promise<any>;

  /**
   * Returns the record from the database with the specified id.
   *
   * @param id - UUID of the record
   * @returns The requested record
   */
  selectRecord(id: string): Promise<any>;

  /**
   * Updates a record in the database with the specified ID.
   *
   * @param id - UUID of the record
   * @param body - The updated record
   * @returns The updated record
   */
  updateRecord(id: string, body: any): Promise<any>;

  /**
   * Deletes the record from the database with the specified id.
   *
   * @param id - UUID of the record
   * @param metadata - Any relevant information about the data
   * @returns The deleted record
   */
  deleteRecord(id: string, metadata?: any): Promise<any>;

  /**
   * Gets UUID and name pairs of records in the database that meet a condition.
   *
   * @param id - UUID of a property in the table that is used to filter the
   *             list of records.
   * @returns A list of (UUID, name) pairs for each record.
   */
  listRecords?(id: string): Promise<any>;

  /**
   * Gets UUID and name pairs of all records in the database table.
   *
   * @returns A list of (UUID, name) pairs for each record.
   */
  allRecords?(): Promise<any>;
}
