import { CitiesDto } from "./citiesDto";

/**
 * DTO to Show the response with a message cpuntries the service
 * 
 * @author German
 * 
 */
 export class DepartmentsDTO {

    public id: number;
	public description: string;
	public name: string;
	public cities: Array<CitiesDto>;

}