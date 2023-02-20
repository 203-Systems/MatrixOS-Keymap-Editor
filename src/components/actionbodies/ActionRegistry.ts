import type { SvelteComponent } from 'svelte';

import { MidiAction } from "./Midi/MidiAction";
import { KeyboardAction } from "./Keyboard/KeyboardAction";
import { LayerAction } from "./Layer/LayerAction";

export type InfoTextType = "Title" | "Subtitle" | "Center"

export interface Action {
    static readonly identifier: string;
    static readonly description: string;
    static readonly icon: SvelteComponent;
    static readonly body: SvelteComponent;

    constructor(): void;
    import(data: any[]): boolean;
    export(): any[] | undefined; //If undefined, then the action is not valid and should not be exported
    info(type: InfoTextType): string | null;
}

export const actions : {[actionIdentifier:string]: Action} = {
    "midi": MidiAction,
    "keyboard":  KeyboardAction,
    "layer":  LayerAction,
};
