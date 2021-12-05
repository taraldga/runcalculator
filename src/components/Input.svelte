<script lang="ts">
    export let value = "40:00";
    export let error = undefined;

    const onChange = (newVal: string) => {
        console.log(halla)
        const vals = newVal.split(":");
        if(vals.length < 2 || vals.length > 3) {
            error = "Please use the format hh:mm:ss"
        }
    }

    const buttonUpdateValue = (incrementor: number) => {
        console.log("Moomo")
        const vals = value.split(":");
        let minuteIndex = 0;
        if(vals.length === 2) {
            minuteIndex = 0;
        } else if (vals.length === 3) {
            minuteIndex = 1;
        }
        vals[minuteIndex] = (Number.parseInt(vals[minuteIndex]) + incrementor).toString();
        value = vals.join(":");
        console.log("Halla")
    }
</script>

<label for="" class="label">Time</label>
<div class="input_row">
    <button class="button" on:click={() => buttonUpdateValue(-1)}>-10</button>
    <button class="button" on:click={() => buttonUpdateValue(-10)}>-1</button>
    <input 
        class={`input ${error !== undefined ? "is-danger": ""}`} 
        bind:value={value} 
        on:change={(e) => onChange(e.currentTarget.value)} 
    >
    <button class="button" on:click={() => buttonUpdateValue(1)}>+1</button>
    <button class="button" on:click={() => buttonUpdateValue(10)}>+10</button>
</div>

<style>
    .input_row {
        display: flex;
    }
</style>