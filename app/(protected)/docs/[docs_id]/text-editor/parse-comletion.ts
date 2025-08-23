export function parseCompletion(completion: string | undefined, input: string){
  if(!completion) return ''

  const startTag = '<completion>'
  const endTag = '</completion>'
  if(completion.startsWith(startTag) && completion.endsWith(endTag)){
    const startIndex = startTag.length;
    const endIndex = completion.indexOf(endTag);

    let result = completion.substring(startIndex, endIndex);

    if(input.endsWith(" ") && result.startsWith(" ")){
      result = result.trimStart();
  }
   
  result = result.split('\n')
  .map((line) => {

    if(line.trim() === ''){
      return ''
    }

    if(RegExp(/^[\t ]{2,}/).exec(line)){
      return line
    }

    return line.trim()
  })
  .join("\n")

  return result
}
return ""
}