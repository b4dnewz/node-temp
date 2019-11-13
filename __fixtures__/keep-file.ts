import * as temp from "../src";

temp.tracker.trackAll(false);

// tslint:disable-next-line
console.log(
    temp.fileSync().path,
);