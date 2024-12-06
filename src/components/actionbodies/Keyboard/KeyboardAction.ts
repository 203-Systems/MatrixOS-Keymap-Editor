import type { Action, ActionInfoType } from "../ActionRegistry";
import type { SvelteComponent } from 'svelte';

import KeyboardActionBody from "./KeyboardActionBody.svelte";
import { Keyboard } from "carbon-icons-svelte";
import type { KeyboardActionData } from "./KeyboardActionData";
import {KeyboardScanCodeFriendlyName} from "./ScanCode";

export class KeyboardAction implements Action {
    static readonly identifier: string = "keyboard";
    static readonly description: string = "Send a Keyboard Key";
    static readonly icon: SvelteComponent = Keyboard;
    static readonly body: SvelteComponent = KeyboardActionBody;

    data: KeyboardActionData;

    constructor() {
        this.data = {
            key: undefined
        }
    }

    import(data: any[]): boolean {
        if(data.length != 1) return false;
        this.data.key = data[0];
        return true;
    }

    export(): any[] | undefined {
        if(this.data.key == undefined) return undefined
        return [this.data.key];
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Title":
                return "Key"
            case "Subtitle":
                if (this.data.key !== undefined) {
                    return KeyboardScanCodeFriendlyName[this.data.key]
                }
                return "None"
        }
        return null;
    }
}