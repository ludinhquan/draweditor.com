#! /bin/sh

NS=${1:-staging}
SYSTEM_NS=$NS-system

NS=$NS envsubst < infra/k8s/app.yml | kubectl delete -f -
NS=$NS envsubst < infra/k8s/ingress.yml | kubectl delete -f -
NS=$SYSTEM_NS envsubst < infra/k8s/system.yml | kubectl delete -f -
