<script lang="ts">
    import {ChevronLeft, ChevronRight, Add, Close} from "carbon-icons-svelte";
    import type {KeymapEditor} from "$lib/editors/KeymapEditor";
    import {onMount} from "svelte";

    export let updateCount: number
    export let editorBackend: KeymapEditor

    let selectedLayer: number = 0;
    let layerCount: number = 1;
    let hoverOnLayer: number = -1;
    
    
    $: {
        updateCount;
        selectedLayer = editorBackend.getSelectedLayer();
        layerCount = editorBackend.getLayerCount();
    }

    function createLayer() {
        editorBackend.createLayer()
    }

    function deleteLayer(index: number) {
        editorBackend.deleteLayer(index)
    }

    function selectLayer(index: number) {
        editorBackend.selectLayer(index)
    }

    function selectOffsetLayer(offset: -1 | 1): void {
        var newLayer = editorBackend.getSelectedLayer()
        if(offset == -1) {
            if (newLayer - 1 >= 0) {
                newLayer -= 1
            }
        }
        else {
            if (newLayer + 1 < editorBackend.getLayerCount()) {
                newLayer += 1
            }
        }

        editorBackend.selectLayer(newLayer)
    }
</script>

<div class="layer-selector-container">
    <div class="layer-control" on:click={() => selectOffsetLayer(-1)}>
        <ChevronLeft size={24}/>
    </div>

    <div class="layers-container">
        {#each Array(layerCount) as _, layer}
            <div class="layer" on:click={() => selectedLayer === layer ? deleteLayer(layer) : selectLayer(layer)} on:mouseover={() => hoverOnLayer = layer} on:mouseleave={() => hoverOnLayer = -1} class:selected={selectedLayer === layer}>
                {#if hoverOnLayer === layer}
                    <Close fill="white" size={26}/>
                {:else}
                    <span>{layer + 1}</span>
                {/if}
                
            </div>
        {/each}
        
        {#if layerCount < 16}
        <div class="layer-add-button" on:click={() => createLayer()}>
            <Add size={24}/>
        </div>
        {/if}
    </div>

    <div class="layer-control" on:click={() => selectOffsetLayer(1)}>
        <ChevronRight size={24}/>
    </div>
</div>

<style lang="scss">
    .layer-selector-container {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

        .layer-control {
            width: 36px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
            flex-shrink: 0;

            border: 2px solid gray;

            transition: background-color 0.2s ease;
            background-color: #eff0f3;

            &:hover {
                background-color: lightgray;
            }

            &:active  {
                background-color: #lightgray;
                scale: 0.95;
            }
        }

        .layers-container {
            min-width: fit-content;
            max-width: calc(80px * 6 + 0.5em * 5);
            display: flex;
            justify-content: center;
            grid-template-columns: repeat(auto-fit, 80px);
            gap: 0.5em;

            overflow: hidden;

            .layer {
                width: 40px;
                height: 40px;
                border-radius: 6px;

                background-color: #a6a6a6;
                cursor: pointer;

                display: flex;
                justify-content: center;
                align-items: center;

                flex-shrink: 0;
                
                transition: background-color 0.2s ease, width 0.2s ease;

                span {
                    color: white;
                    font-family: Inter, sans-serif;
                    font-weight: 500;
                }

                &:hover {
                    background-color: #969696;
                    width: 50px;
                }

                &.selected {
                    background-color: #2c2c2c;
                    width: 80px;

                    &:hover {
                        background-color: #c00000;
                        span {
                            text-decoration:line-through;
                        }
                    }
                }
            }

            .layer-add-button {
                width: 40px;
                height: 40px;
                border-radius: 6px;
                box-sizing: border-box;

                background-color: #dadada;
                border: 1px solid #cecece;
                cursor: pointer;

                display: flex;
                justify-content: center;
                align-items: center;
                
                transition: background-color 0.2s ease, width 0.2s ease;
                
                &:hover {
                    background-color: #cecece;
                }
                
            }
        }
    }
</style>