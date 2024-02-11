import React from 'react'
import MDEditor from '@uiw/react-md-editor'

export default function ViewSummary({ summary }) {
    return (
        <MDEditor.Markdown source={summary} />
    )
}
