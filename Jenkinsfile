pipeline {
    
    agent {
      kubernetes {
        label 'hapia-playwright-build_1_32_3'
       // inheritFrom 'hapiaautomation-build'
        yamlFile './build-spec.yaml'
        defaultContainer 'ngweb-node'
      }
    }
options {
      timeout(time: 3, unit: 'HOURS') // Build timeout set to 2 hour
      buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
    }
//30-45 19 * * 1,3,5
  triggers {
          // cron( 30-45 19 * * 1,3,5)   // 7:30 - 7:45 UTC
         cron('H H(0-7) * * 1,3,5')   // Run every Friday between 12AM - 7:59AM UTC
      }
  //    parameters {
  //   choice(
  //     name: 'Env',
  //     choices: [ 'testparallel:CI', 'testserial:CI', 'testMob:CI'],
  //     description: 'Passing the Environment'
  //   )
  // }
   
   
  stages {
     
      stage('run npm Installation') {
          steps {
              echo "Installing dependencies"
              //(sh 'npm install --quiet --no-progress'
          //   sh 'ls -lah'
          //  // sh 'java -version'
          //    sh 'cat /etc/os-release'
            //  sh 'ps aux' )

            //  sh 'apt-get -y update && apt install default-jdk -y'
            //   sh 'update-alternatives --list java'
            //   sh 'readlink -f $(which java)'
            
            // sh ' npm i -g playwright-firefox'
            // sh 'mkdir browser'   //create folder where we store the all browser
            // sh 'chmod -R 777 browser'   //  in k8 mentioned  root user should be taken so we need to give full access in folder
            // sh 'ls -lah'   //check browser folder access
              sh 'npm install --quiet --no-progress' 
               sh 'npx playwright -V'
               //sh 'PLAYWRIGHT_BROWSERS_PATH=browser/pw-browsers npx playwright install'
              // sh 'export'
                 //installation should be done in mentioned folder
            //  sh 'cat build-spec.yaml'
          }
      }
      stage('run E2E tests testparallel : CI on browserstack  Chrome') {
        options {
              timeout(time: 30, unit: 'MINUTES')   // timeout on this stage
          }
          steps {
              catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              // echo "Starting E2E tests ...  ${params.Env}"
             sh 'npm run testparallel:Chrome'    
             sh 'rm user.json'    
              // sh 'npm run ${Env}'  
              }     
             
          }
      }
      stage('run E2E tests testparallel : CI on browserstack  Edge') {
         options {
              timeout(time: 30, unit: 'MINUTES')   // timeout on this stage
          }
          steps {
              catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              // echo "Starting E2E tests ...  ${params.Env}"
             sh 'npm run testparallel:Edge'   
             sh 'rm user.json'     
              // sh 'npm run ${Env}'  
              }     
             
          }
      }
      stage('run E2E tests testparallel : CI on browserstack  Firefox') {
         options {
              timeout(time: 30, unit: 'MINUTES')   // timeout on this stage
          }
          steps {
              catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              // echo "Starting E2E tests ...  ${params.Env}"
             sh 'npm run testparallel:Firefox'  
             sh 'rm user.json'      
              // sh 'npm run ${Env}'  
              }     
             
          }
      }

          stage('run E2E tests MAC Big Sur:CI on browserstack  safari') {
         options {
              timeout(time: 30, unit: 'MINUTES')   // timeout on this stage
          }
          steps {
             catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              // echo "Starting E2E tests ...  ${params.Env}"
              sh 'npm run testparallel:Safari'        
              // sh 'npm run ${Env}'   
             }    
             
          }
      }
   

       stage('run E2E tests testMob :CI on browserstack  mobile S22') {
         options {
              timeout(time: 16, unit: 'MINUTES')   // timeout on this stage
          }
          steps {
             catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              // echo "Starting E2E tests ...  ${params.Env}"
              sh 'npm run testMob:CI'        
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
