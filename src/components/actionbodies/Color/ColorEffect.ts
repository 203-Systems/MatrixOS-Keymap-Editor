import type {Effect, ActionInfoType} from "../ActionRegistry";
import type {SvelteComponent} from 'svelte';

import ColorEffectBody from "./ColorEffectBody.svelte";
import {ColorPalette} from "carbon-icons-svelte";
import type {ColorEffectData} from "./ColorEffectData";

export class ColorEffect implements Effect {
    static readonly type: string = "effect";
    static readonly identifier: string = "color";
    static readonly description: string = "Set a Color for the Key";
    static readonly icon: SvelteComponent = ColorPalette;
    static readonly body: SvelteComponent = ColorEffectBody;

    data: ColorEffectData;

    constructor() {
        this.data = {
            hasDefault: true,
            hasActivated: false,
            default: [1, 0, 0],
            activated: [1, 1, 1]
        }
    }

    import(data: any[]): boolean {
        try
        {
            this.data.hasDefault = (data[0] & 0b1) > 0;
            this.data.hasActivated = (data[0] & 0b10) > 0;
            this.data.default = [((data[1] >> 16) & 0xFF) / 255, ((data[1] >> 8) & 0xFF) / 255, (data[1] & 0xFF) / 255];
            this.data.activated = [((data[2] >> 16) & 0xFF) / 255, ((data[2] >> 8) & 0xFF) / 255, (data[2] & 0xFF) / 255];
            return true
        }
        catch (error)
        {
            console.error("ColorEffect: Import Failed");
            return false;
        }
    }

    export(): any[] | undefined {
        var data = []
        data[0] = Number(this.data.hasDefault);
        data[0] += Number(this.data.hasActivated) << 1;
        data[1] = (Math.round(this.data.default[0] * 255) << 16) + (Math.round(this.data.default[1] * 255) << 8) + Math.round(this.data.default[2] * 255);
        data[2] = (Math.round(this.data.activated[0] * 255) << 16) + (Math.round(this.data.activated[1] * 255) << 8) + Math.round(this.data.activated[2] * 255);
        return data;
    }

    info(type: ActionInfoType): string | null{
        switch(type)
        {
            case "Color":
                console.log(this.data.default);
                console.log("#" + Math.round(this.data.default[0] * 255).toString(16).padStart(2, "0") + Math.round(this.data.default[1] * 255).toString(16).padStart(2, "0") + Math.round(this.data.default[2] * 255).toString(16).padStart(2, "0"));
                return "#" + Math.round(this.data.default[0] * 255).toString(16).padStart(2, "0") + Math.round(this.data.default[1] * 255).toString(16).padStart(2, "0") + Math.round(this.data.default[2] * 255).toString(16).padStart(2, "0");
        }
        return null;
    }
}