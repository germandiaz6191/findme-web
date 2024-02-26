import { UserDetailDto } from "./userDetailDto";

export class UserDto {
  	public id: number;
	public dSession: Date;
	public nSession: number;
	public pass: string;
	public username: string;
	public userDetailDto: UserDetailDto;
}
