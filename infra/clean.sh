#! /bin/sh

NS=${2:-staging}

NS=$NS envsubst < infra/k8s/app.yml | kubectl delete -f -
NS=$NS envsubst < infra/k8s/system.yml | kubectl delete -f -
NS=$NS envsubst < infra/k8s/ingress.yml | kubectl delete -f -
