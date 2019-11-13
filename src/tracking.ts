import fs from "fs-extra";

class Tracker {

    /**
     * Boolean flag used to know when the tracking is
     * active or manually stopped by the script
     */
    private isActive: boolean = true;

    private garbageSet = new Set<string>();

    private boundListeners: any = {};

    public content() {
        return Array.from(this.garbageSet);
    }

    public track(file: string, force?: true) {
        if (!this.isActive && !force) {
            return;
        }

        if (this.garbageSet.has(file)) {
            return;
        }

        if (!this.hasAlreadyListener("exit")) {
            this.bindExitListener();
        }

        this.garbageSet.add(file);
    }

    public untrack(file: string) {
        if (!this.garbageSet.has(file)) {
            return;
        }

        this.garbageSet.delete(file);
    }

    /**
     * Function used to enable or disable
     * the collection of temporary files and directories
     * generated with the module tracked for
     * automatic removal on process exit
     */
    public trackAll(flag?: boolean) {
        if (flag === false) {
            this.isActive = false;
            this.unbindExitListener();
            return;
        }
        this.isActive = true;
        this.bindExitListener();
    }

    /**
     * Empty the garbage set
     */
    public clear() {
        this.garbageSet.clear();
    }

    /**
     * Clear the garbage set and remove all listeners
     */
    public reset() {
        this.clear();
        this.removeListeners();
    }

    /**
     * Unregister all listeners
     * mainly used for testing purposes
     */
    public removeListeners() {
        for (const event in this.boundListeners) {
            if (this.boundListeners.hasOwnProperty(event)) {
                const fn = this.boundListeners[event];
                process.removeListener(event, fn);
            }
        }
    }

    /**
     * Perform cleanings of files tracked in the garbage set
     */
    public cleanOnExit() {
        this.garbageSet.forEach((filePath: string) => {
            fs.removeSync(filePath);
        });
    }

    private hasAlreadyListener(name: string) {
        return !!this.boundListeners[name];
    }

    private bindExitListener() {
        if (this.hasAlreadyListener("exit")) { return; }
        const fn = this.cleanOnExit.bind(this);
        process.addListener("exit", fn);
        this.boundListeners.exit = fn;
    }

    private unbindExitListener() {
        if (!this.hasAlreadyListener("exit")) { return; }
        const fn = this.boundListeners.exit;
        process.removeListener("exit", fn);
        this.boundListeners.exit = false;
    }
}

export const tracker = new Tracker();
