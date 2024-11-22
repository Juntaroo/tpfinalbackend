import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRolGuard implements CanActivate {
    constructor(
        private readonly reflect: Reflector,//obtengo el decorador
    ){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;//guardo el usuario en el req

        if (!user) {
            throw new ForbiddenException('Usuario no autenticado');//Si el usuario no existe que tire este error
        }

        
        const Rolesreq = this.reflect.get<string[]>('roles', context.getHandler());//Desde el decorador creado, obtengo los roles
        if (!Rolesreq || Rolesreq.length === 0) {
            return true; //En caso de que no se necesite los roles, que pase el usuario
        }

        //Se compara el rol del usuario y si no es correcto, no lo deja pasar
        const userRoles = user.role || [];
        const hasRol = Rolesreq.some(role => userRoles.includes(role));

        if (!hasRol) {
            throw new ForbiddenException('Su rol no le permite el acceso');
        }

        return true;
    }
}