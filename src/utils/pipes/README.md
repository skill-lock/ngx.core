# Pipes
Global angular pipes.

## Truncate
General usage: `{{ string | truncate:newLength(number):newSuffix(string) }}`

```html
{{clientDetails.profile?.lastName | truncate: 1}}
```

## Kebab Case
Converts string to kebab case e.g. `"chickenWings"` => `"chicken-wings"`.

```html
{{"chickenWings" | kebabcase}}
```

## Take
Creates a slice of array with a number of elements taken from the beginning.

```html
<div *ngFor="let group of gamesGrouped | take: 2">
```
