# Docker-Twitter-search-app-2021

 

BA Ousmane Aymérou - Philemon Christopher

 

### How to launch:

 

On the root of the cloned git launch:
    - __docker-compose up -d__
    - __ADMIN_USER=admin ADMIN_PASSWORD=admin docker-compose -f prometheus/docker-compose.yml up -d__

 

### Access to the applications
Applications and view of application  metrics are set up.
    - __tweets-search-app-efrei-2021_app__ application is accessible on: http://127.0.0.1:8111/
    - __app-metrics__ of the application are available on: http://127.0.0.1:8111/metrics
    
### Monitoring
The different monitoring tools are Prometheus and Grafana which are available after the launch step.
    - __Prometheus__ is accessible on: http://127.0.0.1:9090/
    - __Grafana__ is accessible on: http://127.0.0.1:3000/

 

### How to test:

 

In order to test, multibranch pipeline have been set up on AWS Jenkins. 
Each new feature added correspond to a branch on github. 
Our github repository is connected to Jenkins using webhook which helps us to automaticly detect changes on each branch on the git repository.


This connection between Jenkins and Github helps us to set up pipelines for each branch to easily test the good deployment of a new feature.

 

Each branch well deployed create automaticly a new release version which is finaly merge with the master branch.

 

The Jenkins is accessible on: http://15.237.155.210:8080

 

NB : you can check your ruuning containers name by using "docker ps -a"

 

Currently, diffrent types of tests are available :
- Unit tests to test each functionality on our programm
- Integration testing will be testing the entire system integrated
- Stress testing which writing a user simulation to prove that our application can handle 1000 requests per minute


NB : In order to run tests, you only need to run the command 'npm test' if you modified the application. To run test through your docker container, you have to use "docker exec -it <container_name> npm test".