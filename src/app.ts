import { env } from "./env";
import { Application } from "express";
import express = require("express");
import mongoose = require("mongoose");

export class App {
    public app: Application;

    private apiPath: string = env().apiPath || '/api';
    private staticPath: string = env().staticPath || "/public";

    /**
     * @param port Port Application listens on
     * @param middleware Array of middleware to be applied to app 
     * @param options - Array of options for app
     * @param routes Array of express.Router objects for application routes
     */
    constructor(
        private port: number,
        middleware: Array<any>,
        routes: Record<string, express.Router>
    ) {
        this.app = express();
        this.middleware(middleware);
        this.routes(routes);
        this.assets(this.staticPath);
    }

    /**
     * @param _middleware Array of middleware to be loaded into express app
    */
    private middleware(_middleware: any[]) {
        _middleware.forEach((m) => {
            this.app.use(m);
        });
    }

    private options(_options:any[]){
        _options.forEach(op => this.app.options(op));
    }

    public addMiddleWare(middleWare: any) {
        this.app.use(middleWare);
    }

    /**
     * Attaches route objects to app, appending routes to `apiPath`
     * @param routes Array of router objects to be attached to the app
     */
    private routes(routes: Record<string, express.Router>) {
        for(const _routeKey in routes){
            this.app.use(`${this.apiPath}/${_routeKey}`, routes[_routeKey]);
        }
      
    }

    /* Enable express to serve up static assets*/
    private assets(path: string) {
        this.app.use(express.static(path));
    }

    /**
     * Creates a connection to a MongoDB instance using mongoose
     * @param uri MongoDB connection string
    */
    public mongoDB(uri: string) {
        const connect = () => {
            const options: mongoose.ConnectOptions = { keepAlive: true };
            mongoose.connect(uri).then(() => {
                console.log('DB connected successfully');
            }).catch((error) => {
                console.log("DB connection failed. \n", error);
                return process.exit(1);
            });
        };
        
        connect();

        mongoose.connection.on("disconnected", connect);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`[${env().stage}] - Server started at http://localhost:${this.port}${this.apiPath}`);
        });
    }
}