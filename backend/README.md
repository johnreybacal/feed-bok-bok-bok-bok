# backend

## Setup

1. Install dependencies

   ```bash
   npm i
   ```

2. Setup environment variables. Create `.env` at the root level. Set the following variables:

   ```bash
   DB_ENGINE=sqlite
   SQLITE_PATH=db.sqlite3
   KAFKA_HOST=localhost:9092
   ```

3. Synchronize the model

   ```bash
   npm run syncModel
   ```

4. Start the development server locally

   ```bash
   npm run dev
   ```
