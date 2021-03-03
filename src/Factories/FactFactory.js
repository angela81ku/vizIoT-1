export const factFactory = (title, color = undefined, isGraphed = true) => {
    // if there is not title for the fact, cannot be displayed
    if (title == null || title === '') {
        throw new Error('Invalid title');
    }
    if (isGraphed === true && color === undefined) {
        throw new Error('color is not defined for graphed fact')
    }
    return {
        title,
        color,
        isGraphed
    }
}