export const required = (value: string) => {
    if (value) {
        return undefined
    } else return "Field is required"
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength) {
        return "Maximum length for field"
    } else return undefined
}
