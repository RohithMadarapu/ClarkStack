pipeline {
    agent any
    environment {
        SONAR_HOME = tool "sonar"
    }
    stages {
        
        stage("clone code from the github") {
            steps {
                git url: "https://github.com/KarthikEdhala/EStack.git", branch: "main"
            }
        }
        
        stage("Sonarqube Quality Analysis") {
            steps {
                withSonarQubeEnv("sonarqube") {
                    sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=EStack -Dsonar.projectKey=EStack"
                }
            }
        }
        
        //stage("OWASP Dependency Check") {
            //steps {
               //dependencyCheck additionalArguments: "--scan ./", odcInstallation: "dc"
               //dependencyCheckPublisher pattern: "**/dependency-check-report.xml"
            //}
        //}

        
        stage("Sonar Quality Gate Scan") {
            steps {
               timeout(time: 2, unit: "MINUTES") {
                   waitForQualityGate abortPipeline: false
               }
            }
        }
        
        stage("Trivy File System Scan") {
            steps {
                sh "trivy fs --format table -o trivy-fs-report.html ."
            }
        }
        
        stage("Build the docker images") {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/'){
                    //Building the docker images
                    sh 'docker build -t edhala12345/estack-client:latest -f client/Dockerfile client/'
                    sh 'docker build -t edhala12345/estack-backend:latest -f server/Dockerfile server/'
                            
                    // Push Docker images to Docker Hub
                    sh 'docker push edhala12345/estack-client:latest'
                    sh 'docker push edhala12345/estack-backend:latest'
                }
            }
        }
        
        stage("Deploying the application in the kubernetes") {
            steps {       
                  script {
                    // Defining the list of Kubernetes manifest files
                    def manifests = [
                        "Kubernetes-Manifests-file/persistentVolume.yaml",
                        "Kubernetes-Manifests-file/persistentVolumeClaim.yaml",
                        "Kubernetes-Manifests-file/frontend.yaml",
                        "Kubernetes-Manifests-file/backend.yaml",
                        "Kubernetes-Manifests-file/mongodb.yaml"
                    ]
                    
                    // Apply each manifest file
                    withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: '', contextName: '', credentialsId: 'k8s-token', namespace: 'estack', serverUrl: 'https://172.31.7.32:6443']]) {
                        for (manifest in manifests) {
                            sh "kubectl apply -f ${manifest}"
                        }
                    }
                }
            }
        }
        
    }
}