FROM maven:3.6.3-openjdk-11
COPY . /app
RUN cd /app && \
    mvn clean install && \
    mkdir -p deploy/extensions && \
    mkdir -p deploy/themes && \
    cp -r themes/target/classes/theme/hm-* deploy/themes/ && \
    find extensions -wholename "*/target/*.jar" -exec cp {} deploy/extensions/ \;


FROM jboss/keycloak
COPY --from=0 /app/deploy/themes/ /opt/jboss/keycloak/themes/
COPY --from=0 /app/deploy/extensions/ /opt/jboss/keycloak/standalone/deployments/