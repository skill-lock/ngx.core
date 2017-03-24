# Redux Utilities

## Reducer

### updateState
Updates the state by merging the changes and return a new state value.

```ts
import { updateState } from "@skill-lock/ngx.core";

    return updateState(state, {
        isBusy: false,
        items: action.payload
    });

    // instead of
    return Object.assign({}, {
        isBusy: false,
        items: action.payload
    })
```

### updateStateItem
Updates a state property by merging the changes into the state property and it also returns a new state.

```ts
import { updateStateItem } from "@skill-lock/ngx.core";

    return updateStateItem({
        state: state,
        propertyName: "stats",
        item: state.stats,
        changes: { kills: 10 }
    });

    // instead of
    return Object.assign({}, state, {
        specialAbility: Object.assign({}, state.stats, { 
            kills: 10
        })
    });

export interface PlayerState {
    stats: { kills: number }
}
```

### updateMapState
Updates (add/update) an item within the state (which is a dictionary/map state) with the `key` provided,
by finding, merging the changes and returns a new state.

```ts
import { updateMapState } from "@skill-lock/ngx.core";

case heroActionType.updateItem: {
    const { id } = action.payload;
    return updateMapState<HeroState, Hero>(id, state, {
        isAwesome: true
    });

    // instead of
    return Object.assign({}, state, {
        [id]: Object.assign({}, state[id], {
            isAwesome: true
        })
    });
}

interface HeroState extends Dictionary<Hero> {
}
```

### updateAllMapState
Updates (add/update) a collection of items within the state (which is a dictionary/map state) using the 
property `keySelector` (default `id`) as the id within the provided item.
Finding, merging each individual item changes and returns a new state.

```ts
import { updateAllMapState } from "@skill-lock/ngx.core";

    const changes: Partial<Team> = [
        { key: "rmadrid", title: "Real Madrid" },
        { key: "barcelona", title: "Barcelona FC" },
    ];
    return updateAllMapState(state, changes, "key");

    // instead of
    let newState = Object.assign({}, state) as TState;
    for (const item of changes) {
        if (item) {
            const stateItem = Object.assign({}, newState[item["key"]], item) as Team;
            Object.assign(newState, {
                [item["key"]]: stateItem
            });
        }
    }
```