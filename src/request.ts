import {Response} from "express";

export class Request {

    private readonly template: any;

    /**
     * Create a request from the given template
     * @param template The template
     */
    constructor(template: any) {
        this.template = template;
    }

    /**
     * Parse a request body into the template of this request.
     * @param body The request body
     * @param resp Pass in the Express response to automatically generate a 400 response
     */
    parse(body: any, resp: Response | null = null): any | null {
        try {
            return Request.parseObject(body, this.template);
        } catch (e) {
            resp?.status(400).send(e.message);
            return null;
        }
    }

    /**
     * Parses the object and its matching template recursively
     * @param object    The object to parse
     * @param template  The template on which to parse
     * @private
     */
    private static parseObject(object: any, template: any): any {
        let parsed: any = {};
        for (let key in template) {
            if (!template.hasOwnProperty(key))
                continue;

            let templateVal = template[key];
            let expectedType: any = typeof templateVal;

            if (expectedType == 'function') {
                expectedType = this.classnameToTypename(templateVal.name)
            }

            if (expectedType == 'object') {
                parsed[key] = this.parseObject(object[key], template[key]);
                continue;
            }

            if (object[key] != null) {
                parsed[key] = object[key];
            } else if (typeof template[key] == expectedType) {
                parsed[key] = template[key];
            } else {
                throw Error(`Missing key ${key}`);
            }
        }
        return parsed;
    }

    /**
     * Converts a classname (e.g.'Number' and 'String') into their type names ('number', 'string')
     * @param classname The class name
     * @private
     */
    private static classnameToTypename(classname: string): string {
        switch (classname) {
            case 'Number':
                return 'number';
            case 'String':
                return 'string';
            default:
                throw Error(`Unsupported property type ${classname}`);
        }
    }

}