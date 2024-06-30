import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import prodList from "../helpers/helper";
import cart from "../helpers/cart";

const LakeContext = createContext();


const LakeContextProvider = ({children}) => {
    const [CartItems, setCartItems] = useState({});
    const [list, setList] = useState([]);
    const [pass, setPass] = useState({
        user: null,
        token: ""
    });

    
    axios.defaults.headers.common['Authorization'] = pass.token;

    useEffect(()=> {
        const loadData = async() => {
            const data = localStorage.getItem("pass");
            const pData = JSON.parse(data);
            if(data) {
                setPass({
                    ...pass,
                    user: pData.user,
                    token: pData.token
                });
                
            }
            await goods();
            cartz(); 
            
        }
        loadData();
        
        // eslint-disable-next-line
    }, []);

    const goods = async() => {
        const res = await prodList();
        setList(res.data);
        
    }

    const cartz = async() => {
        const res = await cart();
        setCartItems(res);
        console.log(CartItems);
    }


    const addToCart = async(itemId) => {
        if(!CartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}));
        } else {
            setCartItems((prev) => ({...prev,[itemId]: prev[itemId]+1}));
        }
        if(pass.user) {
            await axios.post('/api/cart/add', {itemId});
        } else {
            return null;
        }
    }
     const removeFromCart = async(itemId) => {
        
        if(pass.user) {
            await axios.post('/api/cart/remove', {itemId});
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        }
     }

     const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in CartItems) {
            if(CartItems[item] > 0) {
                let itemInfo = list.find((product) => product._id === item);
                totalAmount += itemInfo.new_price* CartItems[item];
            } 
        }
        return totalAmount;
        
     }
     const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in CartItems) {
            if(CartItems[item] > 0) {
                totalItem += CartItems[item];
            }
        }
        return totalItem;
     }



    const contextValue = {
        CartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        pass,
        list,
        setPass,
        getTotalCartItems
    }
    return (
        <LakeContext.Provider value={contextValue}>
            {children}
        </LakeContext.Provider>
    );
}

const usePass = () => useContext(LakeContext);

export { usePass, LakeContextProvider };

