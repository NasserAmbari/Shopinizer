import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import fs from "fs";
import path, { join } from "path";
import { readFileSync } from "fs";

export default function docs(app: Express) {
    const css = fs.readFileSync(
        path.resolve(
          __dirname,
          "../../node_modules/swagger-ui-dist/swagger-ui.css"
        ),
        "utf-8"
    );

		app.use('/swagger-ui', express.static(join(__dirname, "../../node_modules/swagger-ui-dist")));

		const swaggerCss = readFileSync(
      join(__dirname, "../../node_modules/swagger-ui-dist/swagger-ui.css"), 
      "utf-8"
		);

    app.use(
        "/documentation",
        swaggerUi.serve,
        swaggerUi.setup(swaggerOutput, {
          customCss: swaggerCss,
        })
    );
}