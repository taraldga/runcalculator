<script lang="ts">
    export let value = "40:00";
    export let error = undefined;

    const onChange = (newVal: string) => {
        const vals = newVal.split(":");
        if(vals.length < 2 || vals.length > 3) {
            error = "Please use the format hh:mm:ss"
        }
    }

    const buttonUpdateValue = (incrementor: number) => {
        const vals = value.split(":");
        let minuteIndex = 0;
        if(vals.length === 2) {
            minuteIndex = 0;
        } else if (vals.length === 3) {
            minuteIndex = 1;
        }
        vals[minuteIndex] = (Number.parseInt(vals[minuteIndex]) + incrementor).toString();

        // TODO: Clean up these conditionals
        if( vals.length === 2 && +vals[minuteIndex] > 59) {
            // If we only had mm:ss and got over 60 min
            vals[minuteIndex] = (Number.parseInt(vals[minuteIndex]) % 60).toString();
            vals.splice(0,0,"01")
        } else if ( vals.length === 3 && +vals[minuteIndex] > 59) {
            // If we had hh:mm:ss and got over 60 min
            vals[minuteIndex] = (Number.parseInt(vals[minuteIndex]) % 60).toString();
            vals[0] = (Number.parseInt(vals[0]) + 1).toString();
        } else if(vals.length === 2 && +vals[minuteIndex] < 0) {
            // If we had mm:ss and got below 0 mins, do nothing
            return;
        } else if(+vals[minuteIndex] < 0) {
            // If we had hh:mm:ss and got below 0 mins
            vals[minuteIndex] = ((Number.parseInt(vals[minuteIndex])+ 60 ) % 60).toString();
            
            if(+vals[0] === 1 ) {
                vals.splice(0,1);
            } else {
                vals[0] = (Number.parseInt(vals[0]) + -1).toString();
            }
        }
        value = vals.map(val => val.padStart(2,"0")).join(":");
    }
</script>

<label for="" class="label">Time</label>
<div class="input_row">
    <button class="button" on:click={() => buttonUpdateValue(-10)}>-10</button>
    <button class="button" on:click={() => buttonUpdateValue(-1)}>-1</button>
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