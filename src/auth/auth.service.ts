import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminsService } from "../admins/admins.service";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import * as jwt from "jsonwebtoken";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { LoginAdminDto } from "../admins/dto/login-admin.dto";
import { Admin } from "../admins/entities/admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin) private readonly adminRepo,
    private readonly adminService: AdminsService,
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepo
  ) {}
  async generateTokensAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async registerAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);

    if (candidate) {
      throw new ConflictException("This admin already exists in the system");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.save({
      full_name: createAdminDto.full_name,
      email: createAdminDto.email,
      phone: createAdminDto.phone,
      is_active: createAdminDto.is_active,
      is_creator: createAdminDto.is_creator,
      hashed_password,
    });

    return { adminId: newAdmin.id };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException(
        "This admin does not exist. Check your email and password"
      );
    }

    if (!admin.hashed_password) {
      throw new UnauthorizedException("No password set for this admin.");
    }

    const isValid = await bcrypt.compare(
      loginAdminDto.password,
      admin.hashed_password
    );

    if (!isValid) {
      throw new UnauthorizedException(
        "Email or password is incorrect. Check your email and password"
      );
    }

    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);

    await this.adminRepo.save(admin);

    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "User signed in 🎉", adminId: admin.id, accessToken };
  }

  async logoutAdmin(req: Request, res: Response) {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        throw new BadRequestException("Refresh token is required");
      }
      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET!
      );
      if (!decoded.id || isNaN(Number(decoded.id))) {
        throw new UnauthorizedException(
          "Invalid token payload: missing or invalid id"
        );
      }
      const admin = await this.adminRepo.findOneBy({ id: Number(decoded.id) });

      if (!admin || !admin.hashed_refresh_token) {
        throw new UnauthorizedException("Admin has no refresh token");
      }
      const isMatch = await bcrypt.compare(
        refresh_token,
        admin.hashed_refresh_token
      );
      if (!isMatch) {
        throw new UnauthorizedException("Invalid token");
      }
      admin.hashed_refresh_token = "";
      await this.adminRepo.save(admin);
      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      return { message: "Logged out successfully" };
    } catch (error) {
      throw new UnauthorizedException("Error occurred during logout");
    }
  }

  async refreshAdminToken(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;

    if (!refresh_token) {
      throw new BadRequestException("Refresh token is required");
    }
    let decoded: any;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
    if (!decoded.id || isNaN(Number(decoded.id))) {
      throw new UnauthorizedException(
        "Invalid token payload: missing or invalid id"
      );
    }
    const admin = await this.adminRepo.findOneBy({ id: Number(decoded.id) });

    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException("User not found or token missing");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mismatch");
    }

    const payload = { id: admin.id };
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    });

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
      }
    );

    const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 7);
    admin.hashed_refresh_token = hashedNewRefresh;
    await this.adminRepo.save(admin);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: +process.env.COOKIE_TIME!,
    });

    return {
      message: "Admin accessToken refreshed",
      access_token: newAccessToken,
    };
  }

  async generateTokensUser(user: User) {
    const payload = {
      id: user.id,
      phone: user.phone,
      role: user.role,
      is_verified: user.is_verified,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async registerUser(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByPhone(createUserDto.phone);

    if (candidate) {
      throw new ConflictException("This admin already exists in the system");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newuser = await this.userRepo.save({
      full_name: createUserDto.full_name,
      role: createUserDto.role,
      phone: createUserDto.phone,
      lang: createUserDto.lang,
      region: createUserDto.region,
      hashed_password,
    });

    return { user_id: newuser.id };
  }

  async loginUser(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.usersService.findByPhone(loginUserDto.phone);
    if (!user) {
      throw new UnauthorizedException(
        "This user does not exist. Check your phone and password"
      );
    }
    if (!user.hashed_password) {
      throw new UnauthorizedException("No password set for this user.");
    }
    const isValid = await bcrypt.compare(
      loginUserDto.password,
      user.hashed_password
    );
    if (!isValid) {
      throw new UnauthorizedException(
        "Phone or password is incorrect. Check your phone and password"
      );
    }
    const { accessToken, refreshToken } = await this.generateTokensUser(user);
    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.userRepo.save(user);
    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return { message: "User signed in 🎉", userId: user.id, accessToken };
  }

  async logoutUser(req: Request, res: Response) {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        throw new BadRequestException("Refresh token is required");
      }
      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET!
      );
      if (!decoded.id || isNaN(Number(decoded.id))) {
        throw new UnauthorizedException(
          "Invalid token payload: missing or invalid id"
        );
      }
      const user = await this.userRepo.findOneBy({ id: Number(decoded.id) });

      if (!user || !user.hashed_refresh_token) {
        throw new UnauthorizedException("User has no refresh token");
      }
      const isMatch = await bcrypt.compare(
        refresh_token,
        user.hashed_refresh_token
      );
      if (!isMatch) {
        throw new UnauthorizedException("Invalid token");
      }
      user.hashed_refresh_token = "";
      await this.userRepo.save(user);
      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      return { message: "Logged out successfully" };
    } catch (error) {
      throw new UnauthorizedException("Error occurred during logout");
    }
  }

  async refreshUserToken(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;

    if (!refresh_token) {
      throw new BadRequestException("Refresh token is required");
    }
    let decoded: any;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
    if (!decoded.id || isNaN(Number(decoded.id))) {
      throw new UnauthorizedException(
        "Invalid token payload: missing or invalid id"
      );
    }
    const user = await this.userRepo.findOneBy({ id: Number(decoded.id) });

    if (!user || !user.hashed_refresh_token) {
      throw new UnauthorizedException("User not found or token missing");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mismatch");
    }

    const payload = { id: user.id };
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    });

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
      }
    );

    const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 7);
    user.hashed_refresh_token = hashedNewRefresh;
    await this.userRepo.save(user);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: +process.env.COOKIE_TIME!,
    });

    return {
      message: "User accessToken refreshed",
      access_token: newAccessToken,
    };
  }
}
