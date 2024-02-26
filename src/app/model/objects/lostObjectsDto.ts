import { SectorDto } from "../location/SectorDto";
import { UserDto } from "../login/userDto";
import { KeywordsDto } from "./keywordsDto";

/**
 * DTO to Show the response with a message cpuntries the service
 * 
 * @author German
 * 
 */
 export class LostObjectsDto {

	public id: number;
	public datereport: Date;
	public description: string;
	public identityobject;
	public imagename: string;
	public rsimagecloud: string;
	public rqimagecloud:string;
	public ipaddressowner: string;
	public ipaddressreport: string;
	public matchKeywors: number;
	public status: number;

	public keywords: Array<KeywordsDto> = [];
	public sectors: Array<SectorDto> = [];

	public userOwner: UserDto;
	public userReport: UserDto;


}