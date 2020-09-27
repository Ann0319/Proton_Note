export const stripIndent = (str) => {
    try {
        const lines = str.split('\n')

        const firstContentfulLine = lines[0].trim() ? lines[0] : lines[1]

        const indent = firstContentfulLine.match(/^\s*/)[0].length

        const result = lines
            .map(l => l.slice(indent))
            .join('\n')
            .trim()

        return result
    } catch (_e) {
        return str
    }
}

const wait = async (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 500)
    })
}

export const encrypt = async (data) => {
    await wait(500)
    return data
}

export const decrypt = async (data) => {
    await wait(500)
    return data
}
