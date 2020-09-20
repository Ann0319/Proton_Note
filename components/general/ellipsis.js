/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, createRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'

const useEllipsisStyles = makeStyles({
    tooltipWrapper: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'block'
    }
})

const EllipsisText = (props) => {
    const { placement, textStyle } = props
    const classes = useEllipsisStyles()
    const [isOverflowed, setIsOverflowed] = useState(false)
    const [elementWidth, setElementWidth] = useState(null)
    const labelElement = createRef()

    useEffect(() => {
        if (labelElement.current) {
            if (labelElement.current.scrollWidth > labelElement.current.clientWidth) {
                setIsOverflowed(true)
            } else {
                setIsOverflowed(false)
            }
        }
    }, [props.children, elementWidth])

    const useResizeDetect = (ref) => {
        const handleResize = () => {
            if (ref.current) {
                setElementWidth(labelElement.current.clientWidth)
            }
        }

        useEffect(() => {
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        })
    }

    const itemRef = useRef(null)
    useResizeDetect(itemRef)

    return (
        <div ref={itemRef} {...props}>
            <Tooltip
                title={props.children}
                disableHoverListener={!isOverflowed}
                placement={placement}
            >
                <span
                    className={classes.tooltipWrapper}
                    ref={labelElement}>
                    <span style={textStyle}>{props.children}</span>
                </span>
            </Tooltip>
        </div>
    )
}

EllipsisText.propTypes = {
    placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start',
        'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
    textStyle: PropTypes.object
}

export default EllipsisText
