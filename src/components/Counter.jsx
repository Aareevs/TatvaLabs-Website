import { useState, useEffect, useRef } from 'react'

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true
            startAnimation()
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    const startAnimation = () => {
      const startTime = performance.now()
      const startValue = 0

      const easeOutQuart = (t) => {
        return 1 - Math.pow(1 - t, 4)
      }

      const update = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutQuart(progress)
        const currentValue = Math.round(startValue + (target - startValue) * easedProgress)

        setCount(currentValue)

        if (progress < 1) {
          requestAnimationFrame(update)
        }
      }

      requestAnimationFrame(update)
    }

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default Counter
