const app = require("./src/app");
const dotEnv = require("dotenv");
dotEnv.config();

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  if (error) return console.log(`Server Fails ${error.message}`);
  console.log(`Server listening on port ${PORT}`);
});
