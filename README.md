## Create cluster
```
eksctl create cluster -f ./infra/aws/eks.yml
```

## Deploy
```
NS=staging envsubst < infra/k8s/app.yml | k apply -f -
NS=staging envsubst < infra/k8s/ingress.yml.yml | k apply -f -
```
