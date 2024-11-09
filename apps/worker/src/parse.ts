export function parse(
  text: string,
  values: any,
  startDelimiter = "{",
  endDelimiter = "}"
) {
    let finalString = "";
    let currentIndex = 0;

    try {
        while (currentIndex < text.length) {
            const startIndex = text.indexOf(startDelimiter, currentIndex);

            if (startIndex === -1) {
                finalString += text.slice(currentIndex);
                break;
            } else {
                finalString += text.slice(currentIndex, startIndex);
            }

            const endIndex = text.indexOf(endDelimiter, startIndex);
            if (endIndex === -1) {
                finalString += text.slice(startIndex);
                break;
            }

            const keyPath = text.slice(startIndex + 1, endIndex);
            const keys = keyPath.split(".");

            let resolvedValue = values;
            for (const key of keys) {
                if (resolvedValue && key in resolvedValue) {
                    resolvedValue = resolvedValue[key];
                } else {
                    resolvedValue = `{${keyPath}}`;
                    break;
                }
            }

            finalString += resolvedValue ?? "";
            currentIndex = endIndex + 1;
        }
    } catch (error) {
        console.error("Error parsing text:", error);
        return text; 
    }

    return finalString;
}
