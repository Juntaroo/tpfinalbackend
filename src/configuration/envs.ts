//se importan las dependencias
import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: Number;
    DATABASE_URL: string;
    JWT_SECRETA: string;
}

//se configura el esquema joi
const envsSchema = joi
    .object({
        PORT: joi.number().required,//se le da su tipo si es requerido
        DATABASE_URL: joi.string().required(),
        JWT_SECRETA: joi.string().required(),

    })
    .unknown(true);

    //al valdidarlo o nos devuelve los valores o nos tira un error
    const { error, value } = envsSchema.validate(process.env);
    //si hay error se corta la ejecucion del server y se muestra el mensaje de error
    if (error) throw new Error(`Config validation error: ${error.message}`);
    //se hay un valor se lo guarda en la siguiente variable
    const envVars: EnvVars = value;

    export const envs = {
        port: Number(envVars.PORT),
        database_url: envVars.DATABASE_URL,
        jwt_secreta: envVars.JWT_SECRETA,
    }