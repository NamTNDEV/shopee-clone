import classNames from 'classnames'

interface PropsInterface {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const RANGE = 2
function Pagination({ page, setPage, totalPages }: PropsInterface) {
  const renderPagination = () => {
    let dotBefore = false
    let dotAfter = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
            <span>...</span>
          </button>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
            <span>...</span>
          </button>
        )
      }
      return null
    }
    return Array(totalPages)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (page < RANGE * 2 + 2 && pageNumber > page + RANGE && pageNumber < totalPages - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < totalPages - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < totalPages - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page > totalPages - RANGE * 2 - 1 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-orange-600': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 border', {
          'cursor-not-allowed opacity-30': page === 1,
          'cursor-pointer': page > 1
        })}
        disabled={page === 1}
        onClick={() => setPage(--page)}
      >
        Prev
      </button>
      {renderPagination()}
      <button
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2  border', {
          'cursor-not-allowed opacity-30': page === totalPages,
          'cursor-pointer': page < totalPages
        })}
        disabled={page === totalPages}
        onClick={() => setPage(++page)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
