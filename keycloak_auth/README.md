# Keycloak Extensions for IT-Sec Project


## Building & Installing

The theme and flow extension require some building process and must be added to the keycloak instance afterwards.

### Manual

This can either be done manually by running `mvn clean install` and copying the target files to `themes/` or `standalone/deployments`
In detail:

- For the themes you must copy the target files in `themes/target/classes/hm-*` to `themes/`
- for the extensions you must copy the `*.jar`-files inside the corresponding `extension/*/target/` folder to `standalone/deployments`.

### Scripted

Alternative you can simply build a new Docker image using the `Dockerfile` inside the `root` folder. This `Dockerfile` should behave like the official docker image from keycloak.
