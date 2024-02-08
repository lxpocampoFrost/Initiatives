//@ts-nocheck
import { useEffect, useRef, useState, useContext } from 'react';
import UserContext from '@/context/UserContext';

import { Box, Snackbar } from '@mui/material';
import { ADD_POST, UPDATE_POST, GET_POSTS } from '@/graphql/queries';
import { useMutation } from '@apollo/client';
import Button from '@/components/Button/Button';
import { useMode } from '@/context/ModeContext';

interface EditorProps {
  onSubmitSuccess: () => void;
}

const Editor = ({ onSubmitSuccess }: EditorProps) => {
  const { currentUserDetails } = useContext(UserContext);
  const {
    mode,
    setPage,
    setMode,
    selectedCardData,
    submitting,
    setSubmitting,
  } = useMode();
  const currentUserDetailsId = currentUserDetails && currentUserDetails.userId;

  const [loading, setLoading] = useState(false);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const editorRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    postId: '',
    title: '',
    post: '',
    created_by: '',
    updated_at: '',
  });

  const [actionNotif, setActionNotif] = useState(false);

  const [createPost] = useMutation(ADD_POST);
  const [updatePost] = useMutation(UPDATE_POST);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setSubmitting(true);

      const { title, post } = formData;

      console.log(selectedCardData);

      let mutation: any;
      let variables: any;

      if (selectedCardData) {
        mutation = updatePost;
        variables = {
          postId: selectedCardData?.id,
          post: formData.post,
          title: formData.title,
          updated_at: new Date().toISOString(),
        };
      } else {
        mutation = createPost;
        variables = {
          title,
          post,
          createdBy: currentUserDetailsId,
        };
      }

      const { data } = await mutation({
        variables,
        refetchQueries: [{ query: GET_POSTS }],
      });
      
      console.log('data.updatePost.success = ',data.updatePost);
      console.log('data.updatePost.success = ',data.updatePost.success);

      if ((data.createPost && data.createPost.success === false) ||
        (data.updatePost && data.updatePost.success === false)
      ) {
        setActionNotif(true);
        setLoading(false);
        setTimeout(() => {
          editorRef.current.clear();
        }, 1000);
      }

      if (data.createPost && data.createPost.success === true) {
        setLoading(false);
        setSubmitting(false);
        setTimeout(() => {
          onSubmitSuccess();
          editorRef.current.destroy();
          initializeEditor();
          setPage(1);
        }, 1000);
      }

      if (data.updatePost && data.updatePost.success === true) {
        setLoading(false);
        setSubmitting(false);
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const initializeEditor = async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const RawTool = (await import('@editorjs/raw')).default;
    const Paragraph = (await import('@editorjs/paragraph')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const Quote = (await import('@editorjs/quote')).default;
    const Checklist = (await import('@editorjs/checklist')).default;
    const Warning = (await import('@editorjs/warning')).default;
    const TextVariantTune = (await import('@editorjs/text-variant-tune'))
      .default;
    const Underline = (await import('@editorjs/underline')).default;
    const ImageTool = (await import('@editorjs/image')).default;
    const Marker = (await import('@editorjs/marker')).default;
    const DragDrop = (await import('editorjs-drag-drop')).default;
    const CodeBox = (await import('@bomdi/codebox')).default;
    const Table = (await import('@editorjs/table')).default;
    const AttachesTool = (await import('@editorjs/attaches')).default;
    const Delimiter = (await import('@editorjs/delimiter')).default;

    const editor = new EditorJS({
      placeholder: 'Untitled',
      holder: 'editor-js',
      inlineToolbar: true,
      tools: {
        header: {
          class: Header,
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'yxgn0epf');

                try {
                  const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
                    {
                      method: 'POST',
                      body: formData,
                    }
                  );

                  const result = await response.json();

                  if (result.secure_url) {
                    const formattedResult = {
                      success: 1,
                      file: {
                        url: result.secure_url,
                      },
                    };
                    return formattedResult;
                  } else {
                    console.log({
                      success: 0,
                      error: result.error.message,
                    });
                  }
                } catch (error) {
                  console.error('Error:', error);
                }
              },
            },
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        code: {
          class: Code,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        inlineCode: {
          class: InlineCode,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        delimiter: Delimiter,
        table: Table,
        raw: RawTool,
        warning: {
          class: Warning,
          inlineToolbar: true,
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        textVariant: TextVariantTune,
        underline: Underline,
        AttachesTool: {
          class: AttachesTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'yxgn0epf');

                try {
                  const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
                    {
                      method: 'POST',
                      body: formData,
                    }
                  );

                  const result = await response.json();

                  if (result.secure_url) {
                    const formattedResult = {
                      success: 1,
                      file: {
                        url: result.secure_url,
                        title: result.original_filename,
                      },
                    };

                    return formattedResult;
                  } else {
                    console.log({
                      success: 0,
                      error: result.error.message,
                    });
                  }
                } catch (error) {
                  console.error('Error:', error);
                }
              },
            },
          },
        },
        marker: Marker,
      },
      data:
        mode === 'view' || mode === 'edit'
          ? selectedCardData?.post
          : {
              blocks: [
                {
                  type: 'paragraph',
                  data: {
                    text: '',
                  },
                },
              ],
            },
      readOnly: mode === 'view' ? true : false,
      tunes: ['textVariant'],
      onChange: () => {
        editor.save().then((outputData) => {
          const title =
            outputData.blocks.length > 0
              ? JSON.stringify(outputData.blocks[0])
              : '';

          const body = outputData.blocks.slice(1);
          const bodyBlocks = JSON.stringify(body);

          const isEmpty = outputData.blocks.length === 1;
          setIsEditorEmpty(isEmpty);

          setFormData((prevState) => ({
            ...prevState,
            title: title,
            post: bodyBlocks,
          }));
        });
      },
      onReady: () => {
        new DragDrop(editor);
        console.log('editor ready');
      },
    });

    editorRef.current = editor;
  };

  useEffect(() => {
    initializeEditor();
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <>
      <Box
        id="editor-js"
        sx={{
          color: mode === 'view' ? '#E5E7EB!important' : '#ffffff',
          '.codex-editor ::selection': {
            backgroundColor: '#2c313c',
          },
          '.codex-editor--narrow .codex-editor__redactor': {
            marginRight: '0',
          },
          '.codex-editor__redactor': {
            minWidth: '564px',
            paddingLeft: '60px',
            paddingBottom: mode === 'view' ? '40px!important' : '100px',
            '.ce-block:first-of-type h1': {
              paddingTop: '0',
            },
            '@media screen and (max-width:768px)': {
              minWidth: 'unset',
            },
          },
          '.cdx-button': {
            background: '#25282e',
            color: '#ffffff',
            border: '1px solid #40444C',
            boxShadow: 'none',
            opacity: '0.3',
          },
          '.tc-wrap': {
            '--color-border': '#2C313C',
          },
          '.cdx-input': {
            border: '1px solid #40444C',
            boxShadow: 'none',
          },
          '.tc-cell': {
            borderRight: '1px solid #2C313C',
          },
          '.tc-row': {
            borderBottom: '1px solid #2C313C',
          },
          '.tc-add-column, .tc-table': {
            borderTop: '1px solid #2C313C',
          },
          '.cdx-settings-button': {
            padding: '8px 0',
            minWidth: '20px',
            minHeight: '20px',
            svg: {
              fill: '#ffffff',
            },
          },
          '.ce-conversion-toolbar__label': {
            fontFamily: 'Figtree-Regular,sans-serif',
            fontWeight: '400',
          },
          '.ce-popover-item:hover:not(.ce-popover-item--no-hover), .ce-inline-toolbar__dropdown:hover':
            {
              backgroundColor: '#2C313C',
              borderRadius: '6px 0 0 6px',
            },
          '.cdx-warning:before': {
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='5' y='5' width='14' height='14' rx='4' stroke='white' stroke-width='2'/%3E%3Cline x1='12' y1='9' x2='12' y2='12' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M12 15.02V15.01' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A\")",
          },
          '.ce-toolbar__plus:hover , .ce-toolbar__settings-btn:hover': {
            background: '#2C313C',
            borderRadius: '6px',
          },
          '.ce-inline-tool:hover, .ce-conversion-tool:hover , .tc-row--selected, .tc-cell--selected':
            {
              background: '#2C313C',
            },
          '.ce-conversion-tool--focused, .ce-popover-item--active': {
            boxShadow: 'none',
            background: '#2C313C!important',
          },
          '.ce-block--selected .ce-block__content, .cdx-settings-button:hover , .cdx-attaches--with-file, .cdx-attaches--with-file .cdx-attaches__download-button':
            {
              background: 'transparent',
            },
          '.ce-paragraph[data-placeholder]:empty:before': {
            fontFamily: 'Figtree-Bold,sans-serif',
            fontSize: '32px',
            lineHeight: '1.5',
            fontWeight: '700',
          },
          '.tc-add-row:hover, .tc-add-row:hover:before, .tc-add-column:hover, .tc-popover , .cdx-attaches--with-file .cdx-attaches__download-button:hover':
            {
              background: '#2C313C',
            },
          '.tc-popover__item-icon': {
            background: 'transparent',
          },
          '.ce-popover--opened, .ce-conversion-toolbar': {
            padding: '4px 2px',
            background: '#16191F',
            borderRadius: '8px',
            border: 'none',
          },
          '.ce-popover__items': {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '4px',
            margin: '8px 0',
            '&::-webkit-scrollbar': {
              width: '11px',
              background: '#2C313C',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#2C313C',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#4F545F',
              borderRadius: '8px',
            },
          },
          '.ce-popover-item': {
            padding: '2px',
            color: '#ffffff',
          },
          '.ce-popover-item__title': {
            fontFamily: 'Figtree-Medium,sans-serif',
            fontWeight: '500',
            lineHeight: '16.8px',
            color: '#ffffff',
          },
          '.ce-popover-item__icon, .ce-conversion-tool__icon': {
            border: '1px solid #2C313C',
            borderRadius: '6px',
            boxShadow: 'none',
            background: '#16191F',
            width: '24px',
            height: '24px',
          },
          '.ce-toolbar__plus, .ce-toolbar__settings-btn, .cdx-search-field__icon, .cdx-search-field__icon svg, .ce-popover-item__icon svg':
            {
              width: '24px',
              height: '24px',
            },
          '.codex-editor path': {
            stroke: '#ffffff',
          },
          '.cdx-search-field': {
            background: '#2C313C',
            borderRadius: '6px',
            padding: '4px 0px 4px 4px',
            marginBottom: '0',
            border: 'none',
          },
          '.cdx-search-field__input': {
            fontFamily: 'Figtree-Medium, sans-serif',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '16.8px',
            color: '#ffffff',
          },
          '.cdx-search-field__input::placeholder': {
            color: '#ffffff',
            opacity: '0.3',
          },
          '.cdx-search-field__icon svg, .tc-popover__item-label, .tc-add-column, .tc-add-row':
            {
              color: '#ffffff',
            },
          '.ce-popover__custom-content:not(:empty)': {
            margin: '0 6px 0',
            'div > .cdx-settings-button:not(:first-of-type)': {
              marginLeft: '8px',
            },
          },
          '.ce-toolbar': {
            left: '24px',
          },
          '.ce-inline-toolbar': {
            background: '#0C0E13',
          },
          '.ce-toolbar__settings-btn': {
            marginLeft: '4px',
          },
          '.ce-toolbar__actions': {
            paddingRight: '8px',
          },
          '.ce-block__content': {
            fontFamily: 'Figtree-Regular,sans-serif',
            maxWidth: '632px',
            margin: '0',
            a: {
              color: '#ffffff',
            },
          },
          '.ce-code__textarea': {
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            border: 'none',
          },
          '.ce-toolbar__content': {
            maxWidth: '598px',
          },
          '[data-item-name="list"] > .ce-popover-item__icon': {
            background: 'url(/assets/editor-list-icon.svg)',
            '> svg': {
              display: 'none',
            },
          },
          '@media (max-width: 650px)': {
            '.ce-toolbar__plus, .ce-toolbar__settings-btn': {
              backgroundColor: 'unset',
              border: 'none',
              boxShadow: 'none',
            },
            '.ce-toolbar': {
              left: '0',
            },
            '.cdx-block.cdx-list': {
              paddingLeft: '24px',
            },
            '.ce-block__content': {
              maxWidth: '500px',
            },
            '.cdx-block': {
              padding: '0',
            },
          },
          '@media(max-width:480px)': {
            '.ce-block__content': {
              maxWidth: '360px',
            },
            '.codex-editor__redactor': {
              paddingLeft: '32px',
            },
            '.ce-toolbar__actions': {
              flexDirection: 'column',
            },
            '.ce-toolbar__settings-btn': {
              margin: '4px 0 0 0 ',
            },
          },
        }}
      ></Box>
      <Box
        sx={{
          display: mode !== 'view' || mode === 'edit' ? 'flex' : 'none',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'flex-end',
          paddingTop: '16px',
          borderTop: '1px solid #2C313C',
        }}
      >
        {mode === 'edit' && (
          <Box
            sx={{
              cursor: 'pointer',
              fontFamily: 'Figtree-Medium',
              fontWeight: '500',
              fontSize: '16px',
              color: '#ffffff',
              opacity: '0.5 ',
              lineHeight: '19.2px',
            }}
            onClick={() => setMode('view')}
          >
            Cancel
          </Box>
        )}
        <Button
          text={mode === 'edit' ? 'Update Post' : 'Post'}
          loading={loading}
          width="max-content"
          padding="8px 20px"
          borderRadius="63px"
          lineHeight="19.2px"
          disabled={isEditorEmpty || loading}
          action={() => handleSubmit()}
        />
      </Box>
      <Snackbar
        open={actionNotif}
        autoHideDuration={1200}
        onClose={() => setActionNotif(false)}
        message="Error. Please try again"
      />
    </>
  );
};

export default Editor;
