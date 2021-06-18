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
     */
    parse(body: any): any | null {
        return Request.parseObject(body, this.template);
    }

    private static parseObject(object: any, template: any): any | null {
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
                let subObject = this.parseObject(object[key], template[key]);
                if (subObject == null)
                    return null;
                parsed[key] = subObject;
                continue;
            }

            if (object[key] != null) {
                parsed[key] = object[key];
            } else if (typeof template[key] == expectedType) {
                parsed[key] = template[key];
            } else {
                return null;
            }
        }
        return parsed;
    }

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