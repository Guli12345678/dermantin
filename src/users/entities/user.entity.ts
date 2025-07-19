import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
  USER = "user",
  ADMIN = "manager",
}

export enum UserRegion {
  REGION1 = "USA",
  REGION2 = "UZB",
}

export enum UserLang {
  EN = "en",
  RU = "ru",
  UZ = "uz",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  phone: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: "bigint", default: 0 })
  is_verified: number;

  @Column({ type: "enum", enum: UserRegion, nullable: true })
  region: UserRegion;

  @Column({ type: "enum", enum: UserLang, nullable: true })
  lang: UserLang;

  @Column()
  hashed_password: string;

  @Column({ nullable: true, default: null })
  hashed_refresh_token: string;
}
