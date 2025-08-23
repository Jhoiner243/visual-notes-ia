"use client";

import { useCompletion } from "@ai-sdk/react";
import React from "react";
import { parseCompletion } from "./parse-comletion";

interface TextEditorProps {
	initialContent: string;
	documentId: string;
	initialName: string;
	updatedAt: string;
}

export const TextEditor = ({
  documentId,
  initialContent, 
  initialName,
  updatedAt
}: Readonly<TextEditorProps>) => {
  const editorRef = React.useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const [isAutoCompleteEnabled, setAutoCompleteEnabled] = React.useState(true)
  const [lastManualInput, setLastManualInput] = React.useState<string | null>(null)

  // Utilidad para autocompletar texto en el editor
  const {completion, input, setInput, handleSubmit, stop, setCompletion} = useCompletion({
    api: `${process.env.NEXT_API_URL}/v1/completion/notes/${documentId}/autocomplete`,
    initialInput: initialContent,
    body: {
      prompt: initialContent,
      context: 'autocomplete',
    }
  })

  //Validación de activación/desactivación de autocompletar
  React.useEffect(() => {
    if(!isAutoCompleteEnabled){
      setCompletion('')
    }
  }, [isAutoCompleteEnabled, setCompletion])

  //
  React.useEffect(() => {
    //Activar el autocompletado solo si el cambio de entrada se realizó mediante escritura manual.
    // y el cursor está al final del texto.
    if( isAutoCompleteEnabled && input === lastManualInput && cursorPosition === input.length){
      const timer = setTimeout(() => {
        handleSubmit()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isAutoCompleteEnabled, input, cursorPosition, lastManualInput, handleSubmit])

  React.useEffect(() => {
    if(editorRef.current && cursorPosition === -1){
      editorRef.current.selectionStart = editorRef.current.selectionEnd = input.length
      setCursorPosition(input.length)
    }
  }, [input, cursorPosition])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(e.key === 'Tab'){
      e.preventDefault()
      const completionText = parseCompletion(completion, input)
      stop()
      setCompletion('')
      const newText = input.substring(0, cursorPosition) + completionText + input.substring(cursorPosition)
      setInput(newText)

      // Establezca la posición del cursor al final de la finalización insertada
      const newCursorPosition = cursorPosition + completionText.length  
      setCursorPosition(newCursorPosition)

      // Asegúrese de que el cursor del área de texto también se actualice
      if(editorRef.current){
        editorRef.current.selectionStart = newCursorPosition
        editorRef.current.selectionEnd = newCursorPosition
      }
    }
  }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newInput = e.target.value
      const nextCursorPosition = e.target.selectionStart
      stop()
      setInput(newInput)
      setLastManualInput(newInput)
      setCursorPosition(nextCursorPosition)
  }
  return(
    <div>
      <h1>Text Editor</h1>
      <textarea 
      ref={editorRef} 
      onKeyDown={handleKeyDown} 
      onChange={handleInput}
      value={input}
      placeholder="Escribe aquí tu texto..."
      
      />
    </div>
  )
}
