import {Request} from "./request";

/**
 * Used for extracting configuration data
 * from environment variables. This internally
 * uses the {@see Request} class for parsing
 */
export class Config {

    request: Request;

    /**
     * Create a config parser from the given template
     * @param template The template
     */
    private constructor(template: any) {
        this.request = new Request(template);
    }

    /**
     * Create a config parser from the given template.
     * This is just a wrapper for the template to enable
     * a fluent API
     * @param template The template
     */
    static from(template: any): Config {
        return new Config(template);
    }

    /**
     * Parses the current process.env into the template
     * and returns the object
     */
    read(): any {
        return this.request.parse(process.env);
    }


}
