import { createAction } from "@ngrx/store";
import { UserModel } from "./common.model";


//#region products
// export const getProducts = createAction('[Product] Get Products');

// export const getProductsSuccess = createAction('[Product] Get Products Success', 
// (products: Array<UserModel>) => ({ products }));

// export const deleteSelectedProductFromUI = createAction('[Product] Delete Selected Product From UI',
// (product: UserModel) => ({ product }));

// export const filterProduct = createAction('[Product] Filter Product',
// (dataToFilter: string) => ({ dataToFilter }));

//#endregion

//#region  user

export const getallusers = createAction('[User] Get All Users');
export const addnewuser = createAction('[User] Add New User', (user: UserModel) => ({ user }));

//#endregion