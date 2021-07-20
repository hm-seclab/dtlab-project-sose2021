#/bin/bash

KUBECTL='microk8s kubectl'

$KUBECTL delete namespace spire
$KUBECTL delete clusterrole spire-server-trust-role spire-agent-cluster-role
$KUBECTL delete clusterrolebinding spire-server-trust-role-binding spire-agent-cluster-role-binding
