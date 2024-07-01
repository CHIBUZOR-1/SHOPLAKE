import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import './Search.css'
import { Checkbox, Radio } from 'antd';
import ProductItem from '../../Components/prodItem/ProductItem'
import { Link } from 'react-router-dom'
import brands from '../../helpers/ProductBrands'
import prices from '../../helpers/ProductPrices';
import axios from 'axios';
import { useSearch } from '../../Context/searchContext';
const Search = () => {
    /*const [que, setQue] = useSearchParams();
    let q = que.get("q")
    console.log(q );*/
    const [search] = useSearch();
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [load, setLoad] = useState([]);

    

    useEffect(()=> {
        if(!checked.length || !radio.length) {
            setLoad(search.result); 
            console.log(load);
        };
        // eslint-disable-next-line
    }, [checked.length, radio.length])

    useEffect(()=> {
        if(checked.length || radio.length) {
            filterProducts()
        } else {
            setLoad(search.result)
        }
        // eslint-disable-next-line
    }, [checked, radio])

    
    const handleFilter = async(value, brand)=> {
        let all = [...checked]
        if(value) {
            all.push(brand)
        } else{
            all = all.filter(b => b !== brand)
        }
        setChecked(all);
    }

    const filterProducts = async() => {
        const resp = await axios.post('/api/product/filter-products', {checked, radio});
        if(resp.data.success) {
            setLoad(resp.data.data);
            console.log(resp.data.data)
        }
    }
  return (
    <Layout title={'Search Results'}>
        <div className='SC'>
            <div className='sub'>
                <div className='filter'>
                    <div>
                        <h3 className='sort'>SORT BY</h3>
                        <form className='sf'>
                            <div className='sort1'>
                                <input type="radio" name='sort' />
                                <label htmlFor="">Price - Low to High</label>
                            </div>
                            <div>
                                <input type="radio" name='sort' />
                                <label htmlFor="">Price - High to Low </label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3 className='sort'>Brands</h3>
                        <div className='sf'>
                            {
                                brands.map((b)=> {
                                    return (
                                    <Checkbox key={b.id} onChange={(e)=> handleFilter(e.target.checked, b.label)}>
                                      {b.label}
                                    </Checkbox>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className='sort'>Sort Prices</h3>
                        <div className='sf'>
                            <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
                                {
                                    prices.map((t)=> {
                                        return (
                                            <div key={t.id}>
                                                <Radio value={t.array}>{t.name}</Radio>
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                        <div className='fbtn'>
                            <button className='bdang' onClick={()=> window.location.reload()}>RESET FILTERS</button>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='sr'>Search Results : {load.length === 0? "No Products Found": `${load.length} products found`}</p>
                    <div className='sep'>
                        {
                            load?.map((p, i)=> {
                                return(
                                    
                                        <Link className='results' key={i} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                                            <ProductItem  id={p._id} name={p.product_name} image={`/images/${p.image}`} new_price={p.new_price.toLocaleString()} old_price={p.old_price.toLocaleString()} />
                                        </Link>
                                    
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search