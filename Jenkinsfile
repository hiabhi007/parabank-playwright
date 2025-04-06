pipeline {
    
    agent {
      kubernetes {
        label 'parabank-e2e'
       // inheritFrom 'hapiaautomation-build'
        yamlFile './build-spec.yaml'
        defaultContainer 'ngweb-node'
      }
    }
options {
      timeout(time: 3, unit: 'HOURS') // Build timeout set to 2 hour
      buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
    }

  // triggers {
  //         // cron( 30-45 19 * * 1,3,5)   // 7:30 - 7:45 UTC
  //        cron('H H(0-7) * * 1,3,5')   
  //     }
 
   
   
  stages {
     
      stage('run npm Installation') {
          steps {
              echo "Installing dependencies"
     
              sh 'npm install --quiet --no-progress' 
               sh 'npx playwright -V'
          }
      }
      stage('run E2E tests testparallel : CI on browserstack  Chrome') {
        options {
              timeout(time: 30, unit: 'MINUTES')   // timeout on this stage
          }
          steps {
              catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
             sh 'npm run test:local'    
             sh 'rm user.json'    
              // sh 'npm run ${Env}'  
              }     
             
          }
      }
     
   
        
  }



    post {
            always {
              script {
                allure([
                  includeProperties: false,
                  jdk: '',
                  properties: [],
                  reportBuildPolicy: 'ALWAYS',
                  results: [[path: '/allure-results']]
                ])
              }
            }
          }
}
