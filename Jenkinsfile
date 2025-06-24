pipeline {
    agent any

    environment {
        IMAGE_NAME = "chatgpt-ui"
        DOCKER_REGISTRY = "hub.docker.com/repository/docker/dhanush08/ui"
        DOCKER_CREDENTIALS = "docker-creds"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        node {
          stage('SCM') {
            checkout scm
          }  
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner' // Assumes configured in Jenkins Global Tools
                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    def imageTag = "dhanush08/ui:${env.BUILD_ID}"
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS}") {
                        def image = docker.build(imageTag)
                        image.push()
                    }
                }
            }
        }

        stage('Deploy To Kubernetes') {
            steps {
                withKubeConfig(
                    credentialsId: 'k8-login',
                    serverUrl: 'https://192.168.28.129:6443',
                    clusterName: 'kubernetes',
                    namespace: 'chatgpt-ui',
                    restrictKubeConfigAccess: false
                ) {
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl apply -f service.yaml'
                }
            }
        }

        stage('Verify the Deployment') {
            steps {
                withKubeConfig(
                    credentialsId: 'k8-login',
                    serverUrl: 'https://192.168.28.129:6443',
                    clusterName: 'kubernetes',
                    namespace: 'chatgpt-ui',
                    restrictKubeConfigAccess: false
                ) {
                    sh 'kubectl get pods -n chatgpt-ui'
                    sh 'kubectl get svc -n chatgpt-ui'
                }
            }
        }
    }
}
