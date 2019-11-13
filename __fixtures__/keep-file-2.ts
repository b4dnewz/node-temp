import * as temp from "../src";

temp.tracker.trackAll();

const tmpFile = temp.fileSync().untrack();

// tslint:disable-next-line
console.log(
    tmpFile.path,
);