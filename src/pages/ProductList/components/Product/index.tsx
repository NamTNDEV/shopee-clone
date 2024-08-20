import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { path } from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import FormatUtils from 'src/utils/format'

interface PropsType {
  product: ProductType
}

export default function Product({ product }: PropsType) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{product.price_before_discount}</span>
            </div>
            <div className='text-orange-600 truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{FormatUtils.numberToCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{FormatUtils.numberToSocialMediaStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
