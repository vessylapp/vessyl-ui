require("dotenv").config();

const fs = require("fs");
if(process.env.API_URL === undefined) {
    fs.writeFileSync(".env", `API_URL=http://vw:8000`);
} else {
    fs.writeFileSync(".env", `API_URL=${process.env.API_URL}`);
}