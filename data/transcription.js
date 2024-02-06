import { db } from '@/lib/db'
import { auth } from '@/auth'

export const createTranscription = async (title, transcription, audio_filename) => {
    const session = await auth()
    if (!session) {
        console.log('No User session found.')
        return null
    }
    const userId = session.user.id

    const newTranscription = await db.transcription.create({
        data: {
            userId,
            title,
            transcription,
            summary: '',
            audio_filename
        },
    })
  
    return newTranscription
}

export const getAllTranscriptions = async () => {
    const session = await auth()
    if (!session) {
        console.log('No User session found.')
        return null
    }
    const userId = session.user.id

    const transcriptions = await db.transcription.findMany({
        where: { userId },
    })
  
    return transcriptions
}

export const getTranscription = async (transcriptionId) => {
    const session = await auth()
    if (!session) {
        console.log('No User session found.')
        return null
    }
    const userId = session.user.id

    const transcription = await db.transcription.findFirst({
        where: { id: transcriptionId, userId },
    })
    
    return transcription
}

export const updateTranscription = async (transcriptionId, updateData) => {
    const session = await auth()
    if (!session) {
        console.log('No User session found.')
        return null
    }
    const userId = session.user.id

    console.log('UPDATE DATA:')
    console.log(updateData)
    const existingTranscription = await db.transcription.findUnique({
        where: { id: transcriptionId, userId },
    })
  
    if (!existingTranscription) {
        console.log('Transcription does not exist.')
        return null
    }
  
    const updatedTranscription = await db.transcription.update({
        where: { id: transcriptionId, userId },
        data: updateData,
    })
  
    return updatedTranscription
}

export const deleteTranscription = async (transcriptionId) => {
    const session = await auth()
    if (!session) {
        console.log('No User session found.')
        return null
    }
    const userId = session.user.id

    const existingTranscription = await db.transcription.findUnique({
        where: { id: transcriptionId, userId },
    })
  
    if (!existingTranscription) {
        throw new Error('Transcription not found')
    }
  
    await db.transcription.delete({
        where: { id: transcriptionId },
    })
  
    return
}