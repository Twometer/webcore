import * as express from 'express'
import {Server} from 'http'

export class Webapp {

    private readonly port;
    private server: Server | null = null;
    private app: express.Express = express();
    private setupFunc: (app: express.Express) => void = app => {
        app.set('trust proxy', 1);
        app.use(express.json());
    };
    public base: string = '';

    constructor(port: number) {
        this.port = port;
    }

    /**
     * Starts the web app
     */
    start(): Promise<void> {
        return new Promise((resolve: () => void) => {
            this.setupFunc(this.app);
            this.server = this.app.listen(this.port, () => {
                resolve();
            });
        })
    }

    /**
     * Stops the web app
     */
    stop(): Promise<Error | undefined> {
        return new Promise((resolve: (err: Error | undefined) => void) => {
            this.server?.close(resolve)
        })
    }

    /**
     * Creates a router at `${this.base}/${path}`
     * @param path      The path
     * @param options   Options for the router
     */
    route(path: string, options?: express.RouterOptions): express.Router {
        let router = express.Router(options);
        this.app.use(this.base + path, router);
        return router;
    }

    /**
     * Set a function to run on server setup
     * @param setupFunc the function to run
     */
    setup(setupFunc: (app: express.Express) => void) {
        this.setupFunc = setupFunc;
    }

}