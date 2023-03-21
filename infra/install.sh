#! /bin/sh

NS=${2:-staging}

NS=$NS envsubst < infra/k8s/app.yml | kubectl apply -f -
NS=$NS envsubst < infra/k8s/system.yml | kubectl apply -f -
NS=$NS envsubst < infra/k8s/ingress.yml | kubectl apply -f -

helm install mongodb infra/helm -f infra/helm/value.yaml --namespace system --debug
