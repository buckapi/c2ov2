export interface Client{
	id?:string;
	name?:string;
	email?:string;
	password?:string;
	type?:string;
	status?:string;
	RestUrl?:string;
	images:string[]; 
	idClient:string;
}