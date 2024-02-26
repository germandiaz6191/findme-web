import { DepartmentsDTO } from "./departmentsDTO";

/**
 * DTO to Show the response with a message cpuntries the service
 * 
 * @author German
 * 
 */
 export class CountriesDTO {

    public id: number;
	public description: string;
	public name: string;
	public departments: Array<DepartmentsDTO>;

}