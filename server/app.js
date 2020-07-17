import express from "express";
import path from "path";
import bodyParser from "body-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "../template";

// modules for server side rendering
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "../client/MainRouter";
import { StaticRouter } from "react-router-dom";

import devBundle from "./devConfig";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//comment out before building for production
devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());

app.use(helmet());

app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// mount routes
// app.use("/", userRoutes);

app.get("*", (req, res) => {
  // const sheets = new ServerStyleSheets();

  const context = {};
  const markup = ReactDOMServer.renderToString(
    <React.Fragment>
      <StaticRouter location={req.url} context={context}>
        <MainRouter />
      </StaticRouter>
    </React.Fragment>
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  // const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: {},
    })
  );
});

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
