<script lang="ts">
    import OverflowMenuHorizontal from "carbon-icons-svelte/lib/OverflowMenuHorizontal.svelte";
    import Matrix from "../components/Devices/Matrix.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import LayerSelector from "../components/LayerSelector.svelte";
    import { KeymapEditor } from "$lib/editors/KeymapEditor";
    import type { ActionType } from "$lib/types/ActionType";
    import type { KeyID } from "$lib/types/KeyID";

    import { Usb, DocumentImport, DocumentExport, Upload, Download, Settings} from "carbon-icons-svelte";
    import { onMount } from "svelte";

    let updateCount: number = 0; //Cause all components to update
    let selectedKey:KeyID = undefined;
    let editorBackend = new KeymapEditor(update)

    function update(): void {
        updateCount += 1;
    }

    $: {
        selectedKey; // Mentioning selectedKey in here makes this reactive function run on every change of it
        update();
    }

    function addAction(actionType:ActionType, actionIdentifier: string): void {
        editorBackend.addAction(selectedKey, actionType, actionIdentifier);
    }

    function removeAction(actionType:ActionType, actionIndex: number): void {
        editorBackend.removeAction(selectedKey, actionType, actionIndex)
    }

    onMount(() => {
        update();
    })
</script>

<svelte:head>
    <title>Matrix OS Keymap Editor</title>
</svelte:head>

<main>
    <div class="main-content">
        <div class="header">
            <div class="logo">
                <img src="Matrix OS.svg" class="logo">
            </div>

            <div class="title">
                <span>KEYMAP EDITOR</span>
            </div>

            <div class="controls">
                <div class="control" title="Connect" on:click={() => editorBackend.connect()}>
                    <Usb size={24}/>
                </div>
                <div class="control" title="Import from a file" on:click={() => editorBackend.importUADA()}>
                    <DocumentImport size={24}/>
                </div>
                <div class="control" title="Export to a file" on:click={() => editorBackend.exportUADA()}>
                    <DocumentExport size={24}/>
                </div>
                <div class="control" title="Import from Device" on:click={() => editorBackend.importFromDevice()}>
                    <Download size={24}/>
                </div>
                <div class="control" title="Upload to Device" on:click={() => editorBackend.uploadToDevice()}>
                    <Upload size={24}/>
                </div>
                <div class="control">
                    <Settings size={24}/>
                </div>
            </div>
        </div>

        <div class="device-container">
            <div class="device">
                <Matrix
                        bind:updateCount={updateCount}
                        bind:selectedKey={selectedKey}
                        bind:editorBackend={editorBackend}
                />
            </div>
        </div>
        <div class="layer-selector">
            <LayerSelector
                bind:updateCount={updateCount}
                bind:editorBackend={editorBackend}
            />
        </div>
    </div>

    <div class="sidebar-container">
        <Sidebar
                bind:updateCount={updateCount}
                bind:selectedKey={selectedKey}
                bind:editorBackend={editorBackend}
                on:addAction={e => addAction(e.detail.type, e.detail.actionIdentifier)}
                on:removeAction={e => removeAction(e.detail.type, e.detail.index)}
        />
    </div>
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 1fr 335px;

        width: 100vw;
        height: 100vh;

        background-color: #eff0f3;
    }

    .main-content {
        display: grid;
        grid-template-rows: 75px 1fr;

        .header {
            display: grid;
            grid-template-columns: 1fr max-content 1fr;
            grid-template-rows: 75px;

            .logo {
                img {
                    display: flex;
                    justify-content: center;
                    align-items: center; 

                    height: 100%;
                    padding: 24px;
                    box-sizing: border-box;
                }
            }

            .title {
                display: flex;
                justify-content: center;
                align-items: center;

                font-family: Inter, sans-serif;
                font-weight: 400;
                letter-spacing: 0.4rem;
                font-size: 1.9rem;
            }

            .controls {
                display: flex;
                justify-content: end;
                align-items: center;
                padding-right: 18px;
                gap: 8px;

                .control {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;

                    background-color: black;
                    color: white;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    cursor: pointer;

                    transition: background-color 0.2s ease;
                    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

                    &:hover {
                    background-color: #404040;
                    }

                    &:active  {
                    background-color: #404040;
                    scale: 0.95;
                    }
                }
            }
        }

        .device-container {
            display: flex;
            justify-content: center;
            align-items: center;

            gap: 4rem;

            .device {
                width: 600px;

                aspect-ratio: 1 / 1;
            }

            flex-direction: column;

            width: calc(100vw - 335px);
        }

        .layer-selector {
            padding-bottom: 30px;
        }
    }

    .sidebar-container {
        height: 100vh;
    }
</style>