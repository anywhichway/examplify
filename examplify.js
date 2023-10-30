const replaceBetween = (inputString, delimiterStart, delimiterEnd, replacementCallback,inclusive) => {
    const placeholders = [];
    let startIndex = inputString.indexOf(delimiterStart),
        endIndex;
    while (startIndex !== -1) {
        endIndex = inputString.indexOf(delimiterEnd, startIndex + (inclusive ? delimiterStart.length : 0));
        if (endIndex !== -1) {
            const textBetweenDelimiters = inputString.substring(startIndex + (inclusive ? 0 : delimiterStart.length), endIndex + (inclusive ? delimiterEnd.length : 0));
            const replacementText = replacementCallback(textBetweenDelimiters);
            const placeholder = `_PLCHLDR_${placeholders.length}_`;
            placeholders.push({ placeholder, replacementText });
            inputString = inputString.substring(0, startIndex) + placeholder + inputString.substring(endIndex+(inclusive ? delimiterEnd.length : 0));
        } else {
            // If the end delimiter is not found, break the loop
            break;
        }
        startIndex = inputString.indexOf(delimiterStart, endIndex+1+(inclusive ? delimiterEnd.length : 0))
    }
    // Perform the replacements
    while(inputString.includes("_PLCHLDR_")) {
        placeholders.forEach(({ placeholder, replacementText }) => inputString = inputString.replace(placeholder, inclusive ? replacementText : delimiterStart + replacementText + delimiterEnd));
    }
    return inputString;
}

const replacementCallback = (text) => {
    text = text.replace("```!html","").replace("```","");
    return "```html" + text + "```" + text;
}

const examplify = (inputString) => {
    return replaceBetween(inputString,  "```!html",  "```", replacementCallback, true);
}

export {examplify, examplify as default}