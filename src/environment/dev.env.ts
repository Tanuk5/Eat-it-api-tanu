import { IEnv } from "../Eat-It.types"

const development_environment_variables: IEnv =  {
    stage: process.env.ENVIRONMENT || 'development',
    port: 8082,
    domain:'',
    apiPath: '/api',
    staticPath: '/public',
    db: {
        // we are adding localhost mongodb details.
        name: '',
        user:'',
        pw: '',
        account: '',
        uri: (user: string, pw :string, name :string, account: string): string => {
            return 'mongodb://localhost:27017/db_name'
        }
    }
}

export = { ...development_environment_variables }