import * as CategoryActionCreators from "../../components/categories/store/actions"
import * as ProductActionCreators from "../../components/products/store/actions"

const actions = {
    ...CategoryActionCreators,
    ...ProductActionCreators
};

export default actions;