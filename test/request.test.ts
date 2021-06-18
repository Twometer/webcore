import {Request} from '../src/main'

let request = new Request({
    stringValue: String,
    stringWithDefault: 'default-value',
    numberValue: Number,
    numberWithDefault: 42,
    subObject: {
        subNumber: Number
    }
});

test('Defaults', () => {
    let bareMinimum = {
        stringValue: 'meow',
        numberValue: -4,
        subObject: {
            subNumber: 36
        }
    }

    let parsed = request.parse(bareMinimum);
    expect(parsed.stringWithDefault).toBe('default-value')
    expect(parsed.stringValue).toBe('meow')
    expect(parsed.numberValue).toBe(-4)
    expect(parsed.numberWithDefault).toBe(42)
    expect(parsed.subObject.subNumber).toBe(36);
});

test('Default overwrites', () => {
    let fullObject = {
        stringValue: 'meow',
        stringWithDefault: 'test',
        numberValue: -4,
        numberWithDefault: 123,
        subObject: {
            subNumber: 36
        }
    }

    let parsed = request.parse(fullObject);
    expect(parsed.stringWithDefault).toBe('test');
    expect(parsed.numberWithDefault).toBe(123);
})

test('Invalid object', () => {
    let badObject1 = {};
    let badObject2 = {stringValue: 58};
    let badObject3 = {subObject: {subNumber: 0}};
    expect(request.parse(badObject1)).toBeNull();
    expect(request.parse(badObject2)).toBeNull();
    expect(request.parse(badObject3)).toBeNull();
})

test('Object reference', () => {
    let template = {
        test: 42
    };

    let request = new Request(template);
    let parsed = request.parse({test: 1});

    expect(parsed.test).toBe(1)
    expect(template.test).toBe(42);
})