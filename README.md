# skl.ngx.global
A library that consists of pipes, utilities and services to help you with development

## Getting Started

### Installation

```shell
npm install @skl/ngx.global
```

### Register module

```ts
import { GlobalModule } from "@skl/ngx.global";

@NgModule({
    imports: [
        GlobalModule
    ]
})
export class AppModule {

}
```

## Contributing to the project

#### Install Dependencies
The following process need to be executed in order to get started.

```shell
npm install
```


### Building the code

```shell
gulp build
```
In order to view all other tasks invoke `gulp` or check the gulp tasks directly.

### Running the tests

```shell
gulp test
```

### Development utils

#### Trigger gulp watch
Handles compiling of changes.
```shell
gulp watch
```


#### Running Continuous Tests
Spawns test runner and keep watching for changes.
```
gulp tdd
```

### Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch) --version-suffix beta (default: rc - only applies to prerelease)
```