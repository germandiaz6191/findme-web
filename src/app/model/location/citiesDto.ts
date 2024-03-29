import { SectorDto } from "./SectorDto";

/**
 * DTO to Show the response with a message cpuntries the service
 * 
 * @author German
 * 
 */
 export class CitiesDto {

    public id: number;
	public description: string;
	public name: string;
	public sector: Array<SectorDto>;

}