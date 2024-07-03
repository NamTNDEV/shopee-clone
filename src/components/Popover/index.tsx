import { ReactNode, useRef, useState, useId, ElementType } from 'react'
import { FloatingArrow, FloatingPortal, arrow, shift, useFloating } from '@floating-ui/react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  renderPopover: ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
}

function Popover({ children, renderPopover, className, as: Element = 'div', initialOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const arrowRef = useRef<SVGSVGElement>(null)
  const id = useId()

  const { refs, strategy, x, y, context, middlewareData } = useFloating({
    open: isOpen,
    middleware: [arrow({ element: arrowRef }), shift()]
  })

  const showPopover = () => setIsOpen(true)
  const hidePopover = () => setIsOpen(false)

  return (
    <Element ref={refs.setReference} className={className} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        {isOpen && (
          <motion.div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y || 0,
              left: x - 28 || 0,
              width: 'max-content',
              transformOrigin: `${middlewareData.arrow?.x && middlewareData.arrow?.x + 40}px top`
            }}
            initial={{ opacity: 0, transform: 'scale(0)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0)' }}
            transition={{ duration: 0.2 }}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={28}
              className='fill-white'
              style={{ transform: 'translateX(-25px)' }}
            />
            {renderPopover}
          </motion.div>
        )}
      </FloatingPortal>
    </Element>
  )
}

export default Popover
