import {Config} from "../src/main";

test('Config parser', () => {

    process.env = Object.assign(process.env, {
        TEST_STRING: 'test string',
        TEST_NUMBER: '42'
    });

    let conf = Config.from({
        TEST_STRING: String,
        TEST_NUMBER: Number,
        TEST_DEFAULT: 'hello world'
    }).read();

    expect(conf.TEST_STRING).toBe('test string');
    expect(conf.TEST_NUMBER).toBe(42);
    expect(conf.TEST_DEFAULT).toBe('hello world');

})