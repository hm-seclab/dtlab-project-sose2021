#/bin/bash

KUBECTL='microk8s kubectl'


echo "Create registration entry for the node"
$KUBECTL exec -n spire spire-server-0 -- \
    /opt/spire/bin/spire-server entry create \
    -spiffeID spiffe://yourdomain.com/ns/spire/sa/spire-agent \
    -selector k8s_sat:cluster:microservices-cluster \
    -selector k8s_sat:agent_ns:spire \
    -selector k8s_sat:agent_sa:spire-agent \
    -node

set -e

bb=$(tput bold)
nn=$(tput sgr0)

register() {
    $KUBECTL exec -n spire spire-server-0 -c spire-server -- /opt/spire/bin/spire-server entry create $@
}

echo "${bb}Creating registration entry for the backend - envoy...${nn}"
register \
    -parentID spiffe://yourdomain.com/ns/spire/sa/spire-agent \
    -spiffeID spiffe://yourdomain.com/ns/default/sa/default/backend \
    -selector k8s:ns:default \
    -selector k8s:sa:default \
    -selector k8s:pod-label:app:backend \
    -selector k8s:container-name:envoy

echo "${bb}Creating registration entry for the frontend - envoy...${nn}"
register \
    -parentID spiffe://yourdomain.com/ns/spire/sa/spire-agent \
    -spiffeID spiffe://yourdomain.com/ns/default/sa/default/postgres \
    -selector k8s:ns:default \
    -selector k8s:sa:default \
    -selector k8s:pod-label:app:postgres \
    -selector k8s:container-name:envoy

echo "${bb}Listing created registration entries...${nn}"
$KUBECTL exec -n spire spire-server-0 -- /opt/spire/bin/spire-server entry show
