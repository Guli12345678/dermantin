import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginAdminDto } from "../admins/dto/login-admin.dto";
import { Request, Response } from "express";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  async signup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.registerAdmin(createAdminDto);
  }

  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(loginAdminDto, res);
  }

  @Post("signout")
  adminSignout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logoutAdmin(req, res);
  }

  @Post("refresh")
  adminRefresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshAdminToken(req, res);
  }

  @Post("user/signup")
  async userSignup(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @HttpCode(200)
  @Post("user/signin")
  userSignin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginUser(loginUserDto, res);
  }

  @Post("user/signout")
  userSignout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logoutUser(req, res);
  }

  @Post("user/refresh")
  userRefresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshUserToken(req, res);
  }
}
