import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProduct'
import { useQuery } from '@tanstack/react-query'
import ProductApi from 'src/api/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => ProductApi.getProducts(queryParams)
  })

  console.log('🚀 ~ ProductList ~ productsData:', productsData)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {productsData &&
                productsData.data.data.products.map((product) => <Product key={product._id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
