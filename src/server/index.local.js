// Import dependencies
require("dotenv").config();
const app = require("./server.js");

const PORT = process.env.PORT || 3001;

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});