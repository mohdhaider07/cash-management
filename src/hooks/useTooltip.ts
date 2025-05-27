import { useState, useCallback } from 'react'

interface UseTooltipProps {
    timeout?: number
}

const useTooltip = ({ timeout = 2000 }: UseTooltipProps = {}) => {
    const [showTooltip, setShowTooltip] = useState(false)

    const triggerTooltip = useCallback(() => {
        setShowTooltip(true)

        setTimeout(() => {
            setShowTooltip(false)
        }, timeout)
    }, [timeout])

    return {
        showTooltip,
        triggerTooltip,
    }
}

export default useTooltip
