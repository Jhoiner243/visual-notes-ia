import { TextEditor } from "./text-editor";

export default async function NotesPage({
  params
}: Readonly<{
  params: Promise<{docs_id: string}>
}>){
  const {docs_id} = await params;
  return(
    <div>
   
      <TextEditor 
        documentId={docs_id}
        initialContent="Hola"
        initialName="Hola"
        updatedAt="2023-07-01T00:00:00.000Z"

      />
    </div>
  )
}