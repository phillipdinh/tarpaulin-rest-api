NODE_OPTIONS='--loader ts-node/esm'

NODE_OPTIONS='--loader ts-node/esm' npx knex migrate:latest

NODE_OPTIONS='--loader ts-node/esm' npx knex migrate:up 20250402224344_create_assignments_table.ts

NODE_OPTIONS='--loader ts-node/esm' npx knex seed:run --specific=users_seed.ts

NODE_OPTIONS='--loader ts-node/esm' npx knex seed:run --specific=courses_seed.ts

NODE_OPTIONS='--loader ts-node/esm' npx knex seed:run --specific=assignments_seed.ts

NODE_OPTIONS='--loader ts-node/esm' npx knex seed:run --specific=submissions_seed.ts
