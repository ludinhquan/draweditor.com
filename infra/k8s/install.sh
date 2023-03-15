#! /bin/sh

ACTION=${1:-apply}
NS=${2:-staging}

NS=$NS envsubst < infra/k8s/app.yml | kubectl $ACTION -f -
NS=$NS envsubst < infra/k8s/ingress.yml | kubectl $ACTION -f -
