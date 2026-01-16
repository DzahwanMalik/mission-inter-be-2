/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("movies", (table) => {
    table.increments("id");
    table.string("title");
    table.string("description");
    table.integer("rating");
    table.date("release_date");
    table.integer("popularity");
    table.integer("age_rating");
    table.string("poster_url").nullable();
    table.string("poster_public_id").nullable();
    table.string("backdrop_url").nullable();
    table.string("backdrop_public_id").nullable();
    table.string("trailer_key");
    table.integer("runtime");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("movies");
};
