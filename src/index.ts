import express from "express";
import connect from "./utils/database";
import routes from "./routes/api";
import bodyParser from "body-parser";
import docs from "./docs/route";


const PORT = 3000;

async function init() {
	try {
		await connect();
		
		const app = express();

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		app.use("/api/v1", routes);
		docs(app)

		app.listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}

init();
