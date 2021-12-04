<script lang="ts">
	const presets = [
		"1000m",
		"1 mile",
		"3k",
		"5k",
		"10k",
		"Half Marathon",
		"Marathon",
		"Custom",
	];

	let preset = "Custom"
	let distance = 0;
	let modifier = "KM"
	
	const setCurrentPreset = (newPreset: string) => {
		switch(newPreset) {
			case "1000m":
				distance = 1000;
				modifier = "Meters"
				break;
			case "1 mile":
				distance = 1650;
				modifier = "Meters"
				break;
			case "3k":
				distance = 3000;
				modifier = "Meters"
				break;
			case "5k":
				distance = 5000;
				modifier = "Meters"
				break;
			case "10k":
				distance = 10000;
				modifier = "Meters"
				break;
			case "Half Marathon":
				distance = 21098;
				modifier = "Meters"
				break;
			case "Marathon":
				distance = 42195;
				modifier = "Meters"
				break;
		}
		preset = newPreset; 
	}
</script>


<h1>Running calculator!</h1>
<input class="input" type="time" step="1" value="00:00:00">
<div class="tabs">
	<ul>
		{#each presets as currentPreset }
			<li class={preset === currentPreset && "is-active"}>
				<a on:click={(_) => setCurrentPreset(currentPreset)}>{currentPreset}</a>
			</li>
		{/each}
	</ul>
</div>
<div class="inputrow">
	<input class="input" type="number" bind:value={distance} />
    <div class="select">
        <select bind:value={modifier}>
            <option>KM</option>
            <option>Miles</option>
            <option>Meters</option>
        </select>
    </div>
</div>
<button class="button is-primary">Calculate</button>

<style>
    .inputrow {
        display: flex;
    }
</style>