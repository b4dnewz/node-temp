import * as temp from "../src";

temp.tracker.trackAll(false);

const tmpFile = temp.fileSync().track();

// tslint:disable-next-line
console.log(
    tmpFile.path,
);