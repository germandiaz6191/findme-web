import { InformationService } from "./informationService";
import { Pagination } from "./pagination";

/**
 * DTO to Show the response with a message cpuntries the service
 * 
 * @author German
 * 
 */
 export class Content {

	public informationService: InformationService;
	public pagination: Pagination;
	public content: any;
	
}