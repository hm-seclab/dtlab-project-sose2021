#/bin/bash
KUBECTL='microk8s kubectl'

AWS_DEFAULT_REGION=eu-central-1

$KUBECTL delete secrets regcred

PASS=$(aws ecr get-login-password --region $AWS_DEFAULT_REGION)
$KUBECTL create secret docker-registry regcred \
    --docker-server yourdomain.com.dkr.ecr.eu-central-1.amazonaws.com \
    --docker-username=AWS \
    --docker-password=$PASS
