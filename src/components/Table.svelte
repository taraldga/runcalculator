<script lang="ts">
    import type { SpeedRow } from "../types/SpeedRow"; 
    import type { TargetDistance } from "../types/TargetDistance"; 
    
    export let rows: SpeedRow[];
    export let targetDistance: TargetDistance = undefined;

    let targets = [
        "km/h",
        "400m",
        "1k",
        "5k",
        "10k",
        "Half",
        "Marathon",
    ]
</script>


<table class="table is-fullwidth">
    <thead>
        <tr>
            <th>Distance</th>
            {#each rows as row}
                <th>{row["1k"]} min/km</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each targets as target }
        <tr>
            <td class="has-text-weight-semibold">{target}</td>
            {#each rows as row}
                    <td>{row[target]}</td>
            {/each}
        </tr>
        {/each}
    </tbody>
</table>