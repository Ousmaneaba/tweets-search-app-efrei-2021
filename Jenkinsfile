pipeline{
  agent any
  parameters {
    string(name: 'WAS_RELEASED', defaultValue: '0')
  }
  stages{
    stage('Create release branch'){
      steps {
        script{
          if(env.BRANCH_NAME == 'develop'){
            echo "Creating branch..."
            sh "git checkout -b release_${env.BUILD_NUMBER}"
            sh "touch release_versions_infos/release_${env.BUILD_NUMBER}"
            sh "git add ."
            sh "git commit -m \"release_${env.BUILD_NUMBER}\""
            withCredentials([usernamePassword(credentialsId: env.git_cred, passwordVariable: env.git_pwd, usernameVariable: env.git_account)]) {
              sh("git push https://${env.git_account}:${env.git_pwd}@github.com/Ousmaneaba/test")
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
              url: 'https://github.com/Ousmaneaba/test',
              credentialsId: env.git_cred,
              branch: "master"
            )
            withCredentials([usernamePassword(credentialsId: env.git_cred, passwordVariable: env.git_pwd, usernameVariable: env.git_account)]) {
              sh("git merge --no-ff release_${env.BUILD_NUMBER}")
            }
            withCredentials([usernamePassword(credentialsId: env.git_cred, passwordVariable: env.git_pwd, usernameVariable: env.git_account)]) {
              sh("git push https://${env.git_account}:${env.git_pwd}@github.com/Ousmaneaba/test")
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
