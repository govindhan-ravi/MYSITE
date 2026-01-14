pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE_BACKEND = 'iframeyouu/backend'
        DOCKER_IMAGE_FRONTEND = 'iframeyouu/frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('SonarQube Analysis') {
             steps {
                 script {
                     // def scannerHome = tool 'SonarScanner'
                     // withSonarQubeEnv('SonarQube') {
                     //     sh "${scannerHome}/bin/sonar-scanner"
                     // }
                     echo 'Skipping SonarQube for offline demo'
                 }
             }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_BACKEND}:${env.BUILD_NUMBER}", "./backend")
                    docker.build("${DOCKER_IMAGE_FRONTEND}:${env.BUILD_NUMBER}", "./frontend")
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f infra/k8s/'
            }
        }
    }
}
