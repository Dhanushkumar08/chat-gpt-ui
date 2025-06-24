pipeline {
    agent any

    environment {
        IMAGE_NAME = "chatgpt-ui"
        DOCKER_REGISTRY = "hub.docker.com/repository/docker/dhanush08/ui"
        DOCKER_CREDENTIALS = "docker-creds"
    }

    tools {
        sonarRunner 'SonarScanner' // This must match the name in Jenkins > Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarQube') { // This must match the name in Jenkins > Configure System > SonarQube Servers
                    sh 'sonar-scanner'
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



// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "chatgpt-ui"
//         DOCKER_REGISTRY = "hub.docker.com/repository/docker/dhanush08/ui"
//         DOCKER_CREDENTIALS = "docker-creds"
//     }

//     tools {
//         sonarScanner 'SonarScanner' // assumes you have configured this tool in Jenkins
//     }

//     stages {
//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('SonarQube Analysis') {
//             steps {
//                 withSonarQubeEnv() {
//                     sh 'sonar-scanner'
//                 }
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     docker.build("${IMAGE_NAME}:latest")
//                 }
//             }
//         }

//         stage('Push Docker Image') {
//             steps {
//                 script {
//                     def imageTag = "dhanush08/ui:${env.BUILD_ID}"
//                     docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS}") {
//                         def image = docker.build(imageTag)
//                         image.push()
//                     }
//                 }
//             }
//         }

//         stage('Deploy To Kubernetes') {
//             steps {
//                 withKubeConfig(
//                     credentialsId: 'k8-login',
//                     serverUrl: 'https://192.168.28.129:6443',
//                     clusterName: 'kubernetes',
//                     namespace: 'chatgpt-ui',
//                     restrictKubeConfigAccess: false
//                 ) {
//                     sh 'kubectl apply -f deployment.yaml'
//                     sh 'kubectl apply -f service.yaml'
//                 }
//             }
//         }

//         stage('Verify the Deployment') {
//             steps {
//                 withKubeConfig(
//                     credentialsId: 'k8-login',
//                     serverUrl: 'https://192.168.28.129:6443',
//                     clusterName: 'kubernetes',
//                     namespace: 'chatgpt-ui',
//                     restrictKubeConfigAccess: false
//                 ) {
//                     sh 'kubectl get pods -n chatgpt-ui'
//                     sh 'kubectl get svc -n chatgpt-ui'
//                 }
//             }
//         }
//     }
// }


// withSonarQubeEnv('MySonarQube') {
//     sh 'sonar-scanner'
// }

// stage('SonarQube Analysis') {
//     steps {
//         withSonarQubeEnv('MySonarQube') {
//             sh 'sonar-scanner'
//         }
//     }
// }



// pipeline {
//     agent any
//     environment {
//         IMAGE_NAME = "chatgpt-ui"
//         DOCKER_REGISTRY = "hub.docker.com/repository/docker/dhanush08/ui"
//         DOCKER_CREDENTIALS = "docker-creds"
//     }
//     stages {
//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     docker.build("${IMAGE_NAME}:latest")
//                 }
//             }
//         }
//         stage('Push Docker Image') {
//             steps {
//                 script {
//                     // Define Docker image name without the registry URL
//                     def imageName = "dhanush08/ui:${env.BUILD_ID}"
                    
//                     // Log in to Docker registry and build the Docker image
//                     docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
//                         // Build and tag the Docker image
//                         def image = docker.build(imageName)
//                         // Push the Docker image to Docker Hub
//                         image.push()
//                     }
//                 }
//             }
//         }
//         stage('Deploy To Kubernetes') {
//             steps {
//                 withKubeConfig(
//                     caCertificate: '', 
//                     clusterName: 'kubernetes', 
//                     contextName: '', 
//                     credentialsId: 'k8-login', 
//                     namespace: 'chatgpt-ui', 
//                     restrictKubeConfigAccess: false, 
//                     serverUrl: 'https://192.168.28.129:6443'
//                 ) {
//                     bat "kubectl apply -f deployment.yaml"
//                     bat "kubectl apply -f service.yaml"
//                 }
//             }
//         }
//         stage('Verify the Deployment') {
//             steps {
//                 withKubeConfig(
//                     caCertificate: '', 
//                     clusterName: 'kubernetes', 
//                     contextName: '', 
//                     credentialsId: 'k8-login', 
//                     namespace: 'chatgpt-ui', 
//                     restrictKubeConfigAccess: false, 
//                     serverUrl: 'https://192.168.28.129:6443'
//                 ) {
//                     bat "kubectl get pods -n chatgpt-ui"
//                     bat "kubectl get svc -n chatgpt-ui"
//                 }
//             }
//         }
//     }
// }
