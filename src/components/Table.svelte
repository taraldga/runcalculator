<script lang="ts">
    import type { SpeedRow } from "../types/SpeedRow"; 
    import type { TargetDistance } from "../types/TargetDistance"; 
    
    export let rows: SpeedRow[];
    export let targetDistance: TargetDistance = undefined;
</script>


<table class="table">
    <thead>
        <tr>
            <th>400m</th>
            <th>1k</th>
            <th>5k</th>
            {#if targetDistance !== undefined}
                <th>targetDistance.distanceHeader</th>
            {/if}
            <th>10k</th>
            <th>Half</th>
            <th>Marathon</th>
        </tr>
    </thead>
    <tbody>
        {#each rows as row }
            <tr>
                <td>{row["400"]}</td>
                <td>{row["1000"]}</td>
                <td>{row["5k"]}</td>
                {#if targetDistance !== undefined}
                    <td>{targetDistance.distanceTime}</td>
                {/if}
                <td>{row["10k"]}</td>
                <td>{row["Half"]}</td>
                <td>{row["Marathon"]}</td>
            </tr>
        {/each}
    </tbody>
</table>