const replaceBetween = (inputString, startDelimiter, endDelimiter, evaluate,inclusive) => {
    const placeholders = [];
    let startIndex = inputString.indexOf(startDelimiter),
        endIndex;
    while (startIndex !== -1) {
        endIndex = inputString.indexOf(endDelimiter, startIndex + (inclusive ? startDelimiter.length : 0));
        if (endIndex !== -1) {
            const textBetweenDelimiters = inputString.substring(startIndex + (inclusive ? 0 : startDelimiter.length), endIndex + (inclusive ? endDelimiter.length : 0));
            const replacementText = replacementCallback(textBetweenDelimiters,{startDelimiter,endDelimiter,evaluate});
            const placeholder = `_PLCHLDR_${placeholders.length}_`;
            placeholders.push({ placeholder, replacementText });
            inputString = inputString.substring(0, startIndex) + placeholder + inputString.substring(endIndex+(inclusive ? endDelimiter.length : 0));
        } else {
            // If the end delimiter is not found, break the loop
            break;
        }
        startIndex = inputString.indexOf(startDelimiter)
    }
    // Perform the replacements
    while(inputString.includes("_PLCHLDR_")) {
        placeholders.forEach(({ placeholder, replacementText }) => inputString = inputString.replace(placeholder, inclusive ? replacementText : startDelimiter + replacementText + endDelimiter));
    }
    return inputString;
}

const replaceBetweenAsync =async (inputString, startDelimiter, endDelimiter, evaluate,inclusive) => {
    const placeholders = [];
    let startIndex = inputString.indexOf(startDelimiter),
        endIndex;
    while (startIndex !== -1) {
        endIndex = inputString.indexOf(endDelimiter, startIndex + (inclusive ? startDelimiter.length : 0));
        if (endIndex !== -1) {
            const textBetweenDelimiters = inputString.substring(startIndex + (inclusive ? 0 : startDelimiter.length), endIndex + (inclusive ? endDelimiter.length : 0));
            const replacementText = await replacementCallback(textBetweenDelimiters,{startDelimiter,endDelimiter,evaluate});
            const placeholder = `_PLCHLDR_${placeholders.length}_`;
            placeholders.push({ placeholder, replacementText });
            inputString = inputString.substring(0, startIndex) + placeholder + inputString.substring(endIndex+(inclusive ? endDelimiter.length : 0));
        } else {
            // If the end delimiter is not found, break the loop
            break;
        }
        startIndex = inputString.indexOf(startDelimiter)
    }
    // Perform the replacements
    while(inputString.includes("_PLCHLDR_")) {
        placeholders.forEach(({ placeholder, replacementText }) => inputString = inputString.replace(placeholder, inclusive ? replacementText : startDelimiter + replacementText + endDelimiter));
    }
    return inputString;
}

const replacementCallback = (text,{startDelimiter,endDelimiter,evaluate}) => {
    text = text.replace(startDelimiter,"").replace(endDelimiter,"");
    return startDelimiter.replace("!","") + text + endDelimiter + evaluate(text);
}

const replacementCallbackAsync = async (text,{startDelimiter,endDelimiter,evaluate}) => {
    text = text.replace(startDelimiter,"").replace(endDelimiter,"");
    return startDelimiter.replace("!","") + text + endDelimiter + await evaluate(text);
}

const examplify = (input,evaluate={}) => {
    document.head.insertAdjacentHTML("beforeend",`<style>
.examplified::after { font-size: x-small; position: relative; top: 1em; content: "Rendered by https://www.npmjs.com/examplify"}
</style>`);
    const type = typeof input;
    evaluate = {
        html(text) { return text },
        javascript(text) { return "\n<" + `script>${text}</script>`; },
        ...evaluate
    };
    let output = input;
    if(type === "string") {
        for(const [key,value] of Object.entries(evaluate)) {
            output = replaceBetween(output,  "\`\`\`!"+key,  "\`\`\`", value, true);
        }
        return output;
    } else if(type === "object" && input && input.querySelectorAll) {
        for(const [key,value] of Object.entries(evaluate)) {
            for(const el of input.querySelectorAll(`code[class*='language-!${key}']`)) {
                if(key!=="html" && key!=="javascript") continue;
                el.classList.remove(`language-!${key}`);
                el.classList.add(`language-${key}`);
                const text = value(el.textContent);
                let stop,
                    next;
                if(el.parentElement.tagName==="PRE") {
                    stop = el.parentElement.nextElementSibling;
                    el.parentElement.insertAdjacentHTML("afterend", text);
                    next = el.parentElement.nextElementSibling;
                    el.parentElement.classList.add("examplified");
                } else {
                    stop = el.nextElementSibling;
                    el.insertAdjacentHTML("afterend",text);
                    next = el.nextElementSibling;
                }
                while(next && next!==stop) {
                    if(next.tagName==="SCRIPT") {
                        const script = document.createElement("script");
                        script.innerHTML = next.innerHTML;
                        next.replaceWith(script);
                        next = script;
                    }
                    next = next.nextElementSibling;
                }
            }
        }
        return input;
    }
    throw new TypeError(`examplify: input must be a string or an object supporting querySelectorAll, not ${type}`);
}

const examplifyAsync = async (input,evaluate={}) => {
document.head.insertAdjacentHTML("beforeend",`<style>
.examplified::after { font-size: x-small; position: relative; top: 1em; content: "Rendered by https://www.npmjs.com/examplify"}
</style>`);
    const type = typeof input;
    evaluate = {
        html(text) { return text },
        javascript(text) { return "\n<" + `script>${text}</script>`; },
        ...evaluate
    };
    let output = input;
    if(type === "string") {
        for(const [key,value] of Object.entries(evaluate)) {
            output = await replaceBetween(output,  "```!"+key,  "```", value, true);
        }
        return output;
    } else if(type === "object" && input && input.querySelectorAll) {
        for(const [key,value] of Object.entries(evaluate)) {
            for(const el of input.querySelectorAll(`code[class*='language-!${key}']`)) {
                el.classList.remove(`language-!${key}`);
                el.classList.add(`language-${key}`);
                const text = await value(el.textContent);
                let stop,
                    next;
                if(el.parentElement.tagName==="PRE") {
                    stop = el.parentElement.nextElementSibling;
                    el.parentElement.insertAdjacentHTML("afterend", text);
                    next = el.parentElement.nextElementSibling;
                    el.parentElement.classList.add("examplified");
                } else {
                    stop = el.nextElementSibling;
                    el.insertAdjacentHTML("afterend",text);
                    next = el.nextElementSibling;
                }
                while(next && next!==stop) {
                    if(next.tagName==="SCRIPT") {
                        const script = document.createElement("script");
                        script.innerHTML = next.innerHTML;
                        next.replaceWith(script);
                        next = script;
                    }
                    next = next.nextElementSibling;
                }
            }
        }
        return input;
    }
    throw new TypeError(`examplify: input must be a string or an object supporting querySelectorAll, not ${type}`);
}

export {examplify, examplify as default}