/* eslint-disable no-extend-native */
import moment from 'moment'

export const dateTime = (utctime, format) => {
    return moment.utc(utctime).local().format(format || 'YYYY/M/D HH:mm:ss')
}