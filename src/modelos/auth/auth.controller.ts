import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/login-dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register-dto";
import { AuthGuard } from "./guards/auth.guard";
import { AuthRolGuard } from "./guards/auth_rol.guard";
import { Roles } from "./decorators/roles.decorator";

@Controller("autenticacion")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('super')
  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);//Se registra el usuario
  }


  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);//Se loguea el usuario
  }
}
