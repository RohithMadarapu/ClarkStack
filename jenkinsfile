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
        
        stage("Deploy the application using the docker-compose") {
            steps {
                sh "docker-compose down && docker-compose up -d --build"
            }
        }
        
    }
}
