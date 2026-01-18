/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.alterTable("users", (table) => {
    table.string("verifyToken");
    table.boolean("isVerified");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("verifyToken");
    table.dropColumn("isVerified");
  });
};
