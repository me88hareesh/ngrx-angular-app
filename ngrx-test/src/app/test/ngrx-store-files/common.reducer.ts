import { createReducer, on } from "@ngrx/store";
import { UserModel } from "./common.model";
import { addnewuser, getallusers } from "./common.action";
// import { categoryModel } from "../categories/categories.model";
// import { state } from "@angular/animations";


// export interface ProductModelState {
//     productstore: Array<ProductModel>;
// }

export interface CommonModelState {
    userstore: Array<UserModel>;
}


const initialUserState: Array<UserModel> = [];

// export const commonReducer = createReducer(
//     initialUserState,
//     on(getProductsSuccess, (state, { products }) => [...products]),
//     on(filterProduct, (state, { dataToFilter }) => {
//         debugger;
//         const filterProduct = state.filter(x => x.productName.includes(dataToFilter));
//         return filterProduct;
//     }),
//     on(deleteSelectedProductFromUI, (state, { product }) => {
//         debugger;
//         let updatedproducts = [...state];
//         return updatedproducts;
//     })
// )

export const commonUserReducer = createReducer(
    initialUserState,
    on(getallusers, (state) => {
        // let usermodel = {
        //     UserId: 1,
        //     UserName: "aaa",
        //     UserPhone: "string"
        // };
        // alert(usermodel);
        // return [...state, usermodel];
        return [...state];
    }),
    on(addnewuser, (state, { user }) => {
        // alert(user.UserName);
        return [...state, user]
    })
)