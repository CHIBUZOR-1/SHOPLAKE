import axios from "axios"

const prodList = async () => {
    const resp = await axios.get('/api/product/product_list');
    return resp.data;
}

export default prodList;