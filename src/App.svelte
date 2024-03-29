<script lang="ts">
  import Input from "./components/Input.svelte";

  import Table from "./components/Table.svelte";
  import type { SpeedRow } from "./types/SpeedRow";

  import {
    calculateTimePerDistance,
    calulateKmh,
    convertToFormattedTime,
    convertToSeconds,
    getDistanceInMeters,
    Metric,
  } from "./util/calculators";

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

  let time = "40:00";
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

  const calculateValues = () => {
    const seconds = convertToSeconds(time);
    const meters = getDistanceInMeters(distance, modifier);

    const secondsPerMeter = seconds / meters;

    const row: SpeedRow = {
      "km/h": (
        Math.round(calulateKmh(secondsPerMeter * 1000) * 10) / 10
      ).toString(),
      "400m": convertToFormattedTime(
        calculateTimePerDistance(secondsPerMeter, 400)
      ),
      "1k": convertToFormattedTime(
        calculateTimePerDistance(secondsPerMeter, 1000)
      ),
      "5k": convertToFormattedTime(
        calculateTimePerDistance(secondsPerMeter, 5000)
      ),
      "10k": convertToFormattedTime(
        calculateTimePerDistance(secondsPerMeter, 10000)
      ),
      Half: convertToFormattedTime(
        calculateTimePerDistance(secondsPerMeter, 21098)
      ),
      Marathon: convertToFormattedTime(
        calculateTimePerDistance(secondsPerMeter, 42195)
      ),
    };
    rows = [row];
  };
  calculateValues();
</script>

<section class="hero is-primary">
  <div class="hero-body is-flex">
    <h1 class="title">Løpekalkulator</h1>
  </div>
  <div class="container">
    <Input bind:value={time} bind:error change={() => calculateValues()} />
    <label for="" class="label">Presets</label>
    <div class="select is-fullwidth">
      <select
        on:change={(e) => {
          setCurrentPreset(e.currentTarget.value);
          calculateValues();
        }}
      >
        {#each presets as currentPreset}
          <option value={currentPreset}>
            {currentPreset}
          </option>
        {/each}
      </select>
    </div>
    <label for="" class="label">Distance</label>
    <div class="inputrow">
      <input
        class="input"
        type="number"
        bind:value={distance}
        on:change={(_) => calculateValues()}
      />
      <div class="select">
        <select bind:value={modifier}>
          <option>km</option>
          <option>miles</option>
          <option>meters</option>
        </select>
      </div>
    </div>
  </div>
</section>
<section class="container">
  {#if rows !== undefined}
    <Table {rows} />
  {/if}
</section>

<style>
  .label {
    color: white;
  }
  .inputrow {
    display: flex;
  }
  .title {
    margin: 0 auto;
  }
  .container {
    padding: 0 10px;
  }
  .hero-body {
    padding: 1% 0;
  }
  :global(body) {
    padding: 0;
  }
  .hero {
    background-color: #7395ae;
  }
</style>
