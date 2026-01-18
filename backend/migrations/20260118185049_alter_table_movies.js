/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.alterTable("movies", (table) => {
    table.dropColumn("poster_url");
    table.dropColumn("poster_public_id");
    table.dropColumn("backdrop_url");
    table.dropColumn("backdrop_public_id");
    table.string("poster_image").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.alterTable("movies", (table) => {
    table.dropColumn("poster_image");
    table.string("poster_url").nullable();
    table.string("poster_public_id").nullable();
    table.string("backdrop_url").nullable();
    table.string("backdrop_public_id").nullable();
  });
};
