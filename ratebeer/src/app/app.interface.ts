export interface Beer {
	name?: string;
	beer_id?: number;
	abv?: number;
	flavors?: string[];
}

export interface FlavorBeer extends Beer {
	roasted_burnt?: boolean;
	herbs_spices?: boolean;
	earth?: boolean;
	minerals?: boolean;
	fruit?: boolean;
	pastry?: boolean;
	flower?: boolean;
}