VERSION_MINOR=$(bash $PWD/genSeq.sh GPASSO_MINOR)
sudo docker build --tag durai145/gpasso1.$VERSION_MINOR .
#sudo docker build --tag durai145/gpasso1.$VERSION_MINOR .
sudo docker images

