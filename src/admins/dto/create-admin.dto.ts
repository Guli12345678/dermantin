export class CreateAdminDto {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  
  is_active: boolean;
  is_creator: boolean;
}
