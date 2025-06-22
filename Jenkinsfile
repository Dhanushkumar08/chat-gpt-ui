pipeline {
    agent any
    environment {
        IMAGE_NAME = "chatgpt-ui"
        DOCKER_REGISTRY = "hub.docker.com/repository/docker/dhanush08/ui"
        DOCKER_CREDENTIALS = "docker-creds"
    }
    // stages {
    //     stage('Checkout Code') {
    //         steps {
    //             checkout scm
    //         }
    //     }
        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             docker.build("${IMAGE_NAME}:latest")
        //         }
        //     }
        // }
        // stage('Push Docker Image') {
        //     steps {
        //         script {
        //             // Define Docker image name without the registry URL
        //             def imageName = "dhanush08/ui:${env.BUILD_ID}"
                    
        //             // Log in to Docker registry and build the Docker image
        //             docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
        //                 // Build and tag the Docker image
        //                 def image = docker.build(imageName)
        //                 // Push the Docker image to Docker Hub
        //                 image.push()
        //             }
        //         }
        //     }
        // }
        stage('Deploy To Kubernetes') {
            steps {
                withKubeConfig(
                    caCertificate: '', 
                    clusterName: 'kubernetes', 
                    contextName: '', 
                    credentialsId: 'k8-login', 
                    namespace: 'chatgpt-ui', 
                    restrictKubeConfigAccess: false, 
                    serverUrl: 'https://192.168.208.129:6443'
                ) {
                    bat "kubectl apply -f deployment.yaml"
                    bat "kubectl apply -f service.yaml"
                }
            }
        }
        stage('Verify the Deployment') {
            steps {
                withKubeConfig(
                    caCertificate: '', 
                    clusterName: 'kubernetes', 
                    contextName: '', 
                    credentialsId: 'k8-login', 
                    namespace: 'chatgpt-ui', 
                    restrictKubeConfigAccess: false, 
                    serverUrl: 'https://192.168.208.129:6443'
                ) {
                    bat "kubectl get pods -n chatgpt"
                    bat "kubectl get svc -n chatgpt"
                }
            }
        }
    }
}
