import { Category } from 'src/types/category'
import { SuccessResponseApi } from 'src/types/ultis.type'
import { http } from 'src/utils/http'

const URL = 'categories'
const CategoryApi = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>(URL)
  }
}

export default CategoryApi
