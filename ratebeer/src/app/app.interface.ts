export interface Beer {
	name?: string;
	beer_id?: number;
	abv?: number;
	flavors?: string[];
	beerstyle?: string;
	beerstyle_id?: number;
	calories?: number;
	sub_category?: string;
	broad_category?: string;
	broad_category_id?: string;
	description?: string;
	earth?: boolean;
	flower?: boolean;
	fruit?: boolean;
	herbs_spices?: boolean;
	img_url?: string;
	minerals?: boolean;
	pastry?: boolean;
	rating?: number;
	roasted_burnt?: boolean;
	sub_category_id?: string;
	sub_flavors?: string;
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