// create a user in the request extending namingspace express

declare namespace Express {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export interface Request {
		user: {
			id: string;
		};
	}
}
