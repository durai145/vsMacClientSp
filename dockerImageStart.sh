#sudo docker run -d -p 5002:5000 -it 62b2a7adab98 --net my-mongo-cluster --name node001
sudo docker run -d -p 5000:5000 --net my-mongo-cluster --name node001 -it 4f327ef6a47d
