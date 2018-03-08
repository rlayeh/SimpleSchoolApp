try {
    timeout(time: 20, unit: 'MINUTES') {
        node('nodejs') {
            stage('checkout') {
                checkout scm
            }
            stage('npm install') {
                sh 'npm install'
            }
            stage('npm run build') {
                sh 'npm run build'
            }
            stage('build') {
                openshiftBuild(buildConfig: 'simpleschoolapp', showBuildLogs: 'true')
            }
            stage('deploy') {
                openshiftDeploy(deploymentConfig: 'simpleschoolapp')
            }
        }
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}
