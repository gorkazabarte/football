# FIA7

## Create a K8s cluster
swapoff -a
sudo kubeadm init --cri-socket unix:///var/run/crio/crio.sock

mkdir -p $HOME/.kube
sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.3/manifests/calico.yaml

## Delete a K8s cluster
sudo kubeadm reset --cri-socket unix:///var/run/crio/crio.sock

