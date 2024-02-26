import { TermnsAndConditionsDto } from "./termnsAndConditionsDto";

export class UserDetailDto {
	public id:number;
	public firstnames: string;
	public lastnames: string;
	public numberidcard: string;
	public typesidcard: number;
	public ipAddress: string;
	public fileIdentity: string;
	public termnsAndConditions: Array<TermnsAndConditionsDto>;

}
