export const currentDate = () => {
    const now = new Date()

    const year = now.getFullYear()
    const month = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
    const date = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`

    const hour = now.getHours() > 9 ? now.getHours() : `0${now.getHours()}`
    const minute = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`
    const second = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`


    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}