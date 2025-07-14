import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface ContentEditorProps {
  initialValue?: string;
  onEditorChange: (content: string, editor: any) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ initialValue, onEditorChange }) => {
  const editorRef = useRef(null);

  const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY   || 'no-api-key';

  return (
    <Editor
      apiKey={tinymceApiKey}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default ContentEditor;