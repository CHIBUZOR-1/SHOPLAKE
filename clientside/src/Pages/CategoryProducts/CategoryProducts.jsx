import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { useParams } from 'react-router-dom'
import { Checkbox, Radio } from 'antd';
import prices from '../../helpers/ProductPrices';
import CategoryCard from '../../Components/ProductCard1/CategoryCard';
import Categories from '../../helpers/ProductCategories';
import './CategoryProducts.css'

const CategoryProducts = () => {
    const params = useParams();

    console.log(params);
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    const handleFilter = async(value, brand)=> {
        let all = [...checked]
        if(value) {
            all.push(brand)
        } else{
            all = all.filter(b => b !== brand)
        }
        setChecked(all);
    }
  return (
    <Layout>
        <div className='dc'>
            <div className='suby'>
                <div className='ftr'>
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
                        <h3 className='sort'>Categories</h3>
                        <div className='sf'>
                            {
                                Categories.map((b)=> {
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
                    <p className='sr'>Search Results :</p>
                    <div className='sep3'>
                        {
                           params?.category && (
                             <CategoryCard gt_category={params.category}/>
                           )
                        }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProducts