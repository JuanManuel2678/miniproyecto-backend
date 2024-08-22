import { PORT } from "./config/config.js";
import app from "./app.js";




app.listen(PORT, () =>
  console.log(`server run on https://localhost:${PORT}`)
);
