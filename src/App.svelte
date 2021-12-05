<script lang="ts">
import Input from "./components/Input.svelte";

import Table from "./components/Table.svelte";
import type { SpeedRow } from "./types/SpeedRow";

import { calculateTimePerDistance, calulateKmh, convertToFormattedTime, convertToSeconds, getDistanceInMeters, Metric } from "./util/calculators";

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

	let preset = "Custom";

	let time = undefined;
	let error = undefined;

	let distance = 10;
	let modifier: Metric = "km";

	let rows = undefined;

	const setCurrentPreset = (newPreset: string) => {
		switch (newPreset) {
			case "1000m":
				distance = 1000;
				modifier = "meters";
				break;
			case "1 mile":
				distance = 1650;
				modifier = "meters";
				break;
			case "3k":
				distance = 3000;
				modifier = "meters";
				break;
			case "5k":
				distance = 5000;
				modifier = "meters";
				break;
			case "10k":
				distance = 10000;
				modifier = "meters";
				break;
			case "Half Marathon":
				distance = 21098;
				modifier = "meters";
				break;
			case "Marathon":
				distance = 42195;
				modifier = "meters";
				break;
		}
		preset = newPreset;
	};

	const calulateValues = () => {
		const seconds = convertToSeconds(time);
		const meters = getDistanceInMeters(distance, modifier);

		const secondsPerMeter = seconds / meters;

		const row: SpeedRow = {
			"km/h": (Math.round(calulateKmh(secondsPerMeter*1000)*10)/10).toString(),
			"400m": convertToFormattedTime(calculateTimePerDistance(secondsPerMeter, 400)),
			"1k": convertToFormattedTime(calculateTimePerDistance(secondsPerMeter, 1000)),
			"5k": convertToFormattedTime(calculateTimePerDistance(secondsPerMeter, 5000)),
			"10k": convertToFormattedTime(calculateTimePerDistance(secondsPerMeter, 10000)),
			"Half": convertToFormattedTime(calculateTimePerDistance(secondsPerMeter, 21098)),
			"Marathon": convertToFormattedTime(calculateTimePerDistance(secondsPerMeter, 42195)),
		}
		rows = [row];
	}
</script>

<section class="hero is-primary">
	<div class="hero-body">
		<h1 class="title">Running calculator!</h1>
	</div>
</section>
<section class="section">
	<div class="container">
		<Input bind:value={time} bind:error={error} />
		<label for="" class="label">Presets</label>
		<div class="select is-fullwidth">
			<select on:change={e => setCurrentPreset(e.currentTarget.value)}>
				{#each presets as currentPreset}
					<option value={currentPreset}>
						{currentPreset}
					</option>
				{/each}
			</select>
		</div>
		<label for="" class="label">Distance</label>
		<div class="inputrow">
			<input class="input" type="number" bind:value={distance} />
			<div class="select">
				<select bind:value={modifier}>
					<option>km</option>
					<option>miles</option>
					<option>meters</option>
				</select>
			</div>
		</div>
		<button class="button is-primary is-fullwidth" on:click={_ => calulateValues()}>Calculate</button>
	</div>
</section>
<section class="section">
	{#if rows !== undefined}
		<Table rows={rows} />
	{/if}
</section>


<style>
	.inputrow {
		display: flex;
	}
</style>
