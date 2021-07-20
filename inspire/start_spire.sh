#/bin/bash

KUBECTL='microk8s kubectl'

echo "creating SPIRE server stuff"
cd ~/dev/server
$KUBECTL apply -f spire-namespace.yaml
$KUBECTL apply \
    -f server-account.yaml \
    -f spire-bundle-configmap.yaml \
    -f server-cluster-role.yaml
$KUBECTL apply \
    -f server-configmap.yaml \
    -f server-statefulset.yaml \
    -f server-service.yaml

echo "Created server"

echo "creating SPIRE agent stuff"
cd ~/dev/agent
$KUBECTL apply \
    -f agent-account.yaml \
    -f agent-cluster-role.yaml
$KUBECTL apply \
    -f agent-configmap.yaml \
    -f agent-daemonset.yaml

echo "Created agent"
$KUBECTL get pods -n spire
