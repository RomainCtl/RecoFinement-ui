# RecoFinementUi

* Documentation: [https://RomainCtl.github.io/RecoFinement/](https://RomainCtl.github.io/RecoFinement/)
* Master project repo: [https://github.com/RomainCtl/RecoFinement](https://github.com/RomainCtl/RecoFinement)

> Check instruction about requirements in the `README.md` file of the master project.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.


## Usage

```bash
# Initialize project (install dependencies)
make init

# To generate a new component. You can also use 'ng generate directive|pipe|service|class|guard|interface|enum|module'
ng generate component <component-name>
```

> You can use `ng` or `make` command, according to your preferences.

### With `ng`

```bash
#  Run dev server, Navigate to `http://localhost:4200/`
ng serve

# Build the project (The build artifacts will be stored in the 'dist/' directory)
ng build

# To execute the unit tests via [Karma](https://karma-runner.github.io)
ng test

# To execute the end-to-end tests via [Protractor](http://www.protractortest.org/)
ng e2e
```

### With `make`

To be homogeneous with the api, we have `make` commands:
```bash
# Serve locally the development build (with hot-reloads)
make serve

# Build project
make build

# Run the unit tests via [Karma](https://karma-runner.github.io)
make test

# Run the end-to-end tests via [Protractor](http://www.protractortest.org/)
make e2e
```


## Contribution

Contributions are managed using github's Pull Request (PR). After cloning the `master` branch of the project, use the following commands to create a new branch with its associated `Pull Request`:

```bash
# Create a feature branch and its PR
make git-branch feat="Adds a nice feature"

# Create a bug fix branch and its PR
make git-branch fix="Fix a bug"

# Create a documentation|support branch and its PR
make git-branch doc="Adds a nice documentation or support"
```
