import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  full_name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column({ default: true })
  is_active: boolean;
  @Column({ default: false })
  is_creator: boolean;

  @Column({ nullable: true, default: null })
  hashed_refresh_token: string;

  @Column()
  hashed_password: string;
}
