# Code Citations

## License: unknown
https://github.com/puyo/config/tree/c3145cd1ce0c826003bc253157dac9c383922ee7/apt-work-ubuntu-22.sh

```
print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/
```


## License: BSD_3_Clause
https://github.com/ethz-asl/libpointmatcher/tree/2e7a92d39573ccde8ef216dcfbd368dd520a7763/build_system/lpm_utility_script/lpm_install_docker_tools.bash

```
dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list
```


## License: unknown
https://github.com/dpb1857/synced/tree/9de0a8421c4aea47dcc662fc4e8ac3061dbc9cde/bin/linode-setup.sh

```
/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update
```


## License: unknown
https://github.com/vinser52/configs/tree/ec11f724000b5d26b23cf5dee69173c3c486fc04/instal_docker.sh

```
-o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker
```


## License: unknown
https://github.com/vasicit/install-scripts/tree/dfe83300672cab5b978dd34dbcc1264422dba738/install-docker-compose-ubuntu.sh

```
-p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch
```

