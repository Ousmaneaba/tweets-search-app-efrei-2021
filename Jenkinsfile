pipeline{
  agent any
  parameters {
    string(name: 'WAS_RELEASED', defaultValue: '0')
    string(name: 'HAS_TEST_FAILED', defaultValue: '1')
    string(name: 'IS_RELEASE_BRANCH', defaultValue: '0')
  }
  stages{
    stage('Build app'){
      steps {
        script{
          sh "echo ${env.BRANCH_NAME} > tmp_branch"
          RELEASE_OUTPUT = sh( script: "grep -oi release tmp_branch | head -1", returnStdout: true)

          if(RELEASE_OUTPUT != "release"){
              env.IS_RELEASE_BRANCH = '0'
            }
            else{
              env.IS_RELEASE_BRANCH = '1'
            }
          
          sh 'rm tmp_branch'

          if(env.BRANCH_NAME != 'master' && IS_RELEASE_BRANCH != '1'){
            echo "Building app..."
            sh 'docker-compose up -d'
          }
          else{
            echo "Build app skipped"
          }
        }
      }
    }
    stage('Run tests'){
      steps {
        script{
          if(env.BRANCH_NAME == 'develop'){
            echo "Running charge tests..."
            sh 'npm install'
            sh 'npm test -- charge'
            sh 'npm test -- charge &> tmp_test'
            FAILED_OUTPUT = sh( script: "grep -oi failed tmp | head -1", returnStdout: true)
            
            if(FAILED_OUTPUT != "failed"){
              env.HAS_TEST_FAILED = '0'
            }
            else{
              echo "TESTS FAILED !"
            }
            sh 'rm tmp_test'
          }
          else{
            echo "Run charge tests skipped"
          }
          if(env.BRANCH_NAME != 'develop' && env.BRANCH_NAME != 'master' && IS_RELEASE_BRANCH != '1'){
            echo "Running unit and integration tests..."
            sh 'npm install'
            sh 'npm test -- all'
            sh 'npm test -- all &> tmp_test'
            FAILED_OUTPUT = sh( script: "grep -oi failed tmp | head -1", returnStdout: true)
            
            if(FAILED_OUTPUT != "failed"){
              env.HAS_TEST_FAILED = '0'
            }
            else{
              echo "TESTS FAILED !"
            }
            sh 'rm tmp_test'
          }
          else{
            echo "Run unit and integration tests skipped"
          }
        }
      }
    }
    stage('Docker images down'){
      steps {
        script{
          if(env.BRANCH_NAME != 'master' && IS_RELEASE_BRANCH != '1'){
            echo "Downing docker images"
            sh 'docker-compose down'
          }
          else{
            echo "Docker images down skipped"
          }
        }
      }
    }
    stage('Create release branch'){
      steps {
        script{
          if(env.BRANCH_NAME == 'develop' && env.WAS_RELEASED != '1'){
            echo "Creating branch..."
            sh "git checkout -b release_${env.BUILD_NUMBER}"
            sh "touch release_versions_infos/release_${env.BUILD_NUMBER}"
            sh "git add ."
            sh "git commit -m \"release_${env.BUILD_NUMBER}\""
            withCredentials([usernamePassword(credentialsId: env.git_cred, passwordVariable: env.git_pwd, usernameVariable: env.git_account)]) {
              sh("git push https://${env.git_account}:${env.git_pwd}@github.com/Ousmaneaba/tweets-search-app-efrei-2021")
            }
            env.WAS_RELEASED = '1'
          }
          else{
            echo "Create release branch skipped"
          }
        }
      }
    }
    stage('Merge release branch into master'){
      steps {
        script{
          if(env.WAS_RELEASED == '1'){
            echo "Merging release branch into master..."
            git(
              url: 'https://github.com/Ousmaneaba/tweets-search-app-efrei-2021',
              credentialsId: env.git_cred,
              branch: "master"
            )
            withCredentials([usernamePassword(credentialsId: env.git_cred, passwordVariable: env.git_pwd, usernameVariable: env.git_account)]) {
              sh("git merge --no-ff release_${env.BUILD_NUMBER}")
            }
            withCredentials([usernamePassword(credentialsId: env.git_cred, passwordVariable: env.git_pwd, usernameVariable: env.git_account)]) {
              sh("git push https://${env.git_account}:${env.git_pwd}@github.com/Ousmaneaba/tweets-search-app-efrei-2021")
            }
          }
          else{
            echo "Merge release branch into master skipped"
          }
        }
      }
    }
    stage('Deploy app'){
      steps {
        script{
          if(env.BRANCH_NAME == 'master'){
            echo "Deploying app ..."
            sh 'docker container prune'
            sh 'docker image prune'
            sh 'docker-compose up -d'
            sh 'ADMIN_USER=admin ADMIN_PASSWORD=admin docker-compose -f prometheus/docker-compose.yml up -d'
          }
          else{
            echo "Deploy app skipped"
          }
        }
      }
    }
  }
}
