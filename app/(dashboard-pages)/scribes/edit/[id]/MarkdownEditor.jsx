'use client'
import React from 'react'
import MDEditor, { commands } from '@uiw/react-md-editor'


const MarkdownEditor = ({ summary, setSummary }) => {

    return (
        <div>
            <MDEditor
                value={summary}
                onChange={setSummary}
                height={380}
                commands={[
                    commands.bold, 
                    commands.italic, 
                    commands.hr,
                    commands.title, 

                    commands.divider, 

                    commands.link, 
                    commands.quote,
                    commands.code, 
                    commands.codeBlock,
                    commands.image,
                    commands.table,
                    commands.help,
                    
                    commands.divider
                ]}
            />
        </div>
    )
}

export default MarkdownEditor
