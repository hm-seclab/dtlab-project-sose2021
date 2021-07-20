#!/bin/bash
mvn clean verify
mkdir -p deploy/{extensions,themes}
cp -r themes/target/classes/theme/hm-* deploy/themes/
find extensions -wholename "*/target/*.jar" -exec cp {} deploy/extensions/ \;