pipeline{
  agent any
  parameters {
    string(name: 'WAS_RELEASED', defaultValue: '0')
    string(name: 'HAS_TEST_FAILED', defaultValue: '1')
  }
  stages{
    stage('Build app'){
      steps {
        script{
          if(env.BRANCH_NAME == 'develop'){
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
            echo "Running test..."
            sh 'npm install'
            sh 'npm test &> tmp_test'
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
            echo "Run tests skipped"
          }
        }
      }
    }
    stage('Docker images down'){
      steps {
        script{
          if(env.BRANCH_NAME == 'develop'){
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
  }
}
