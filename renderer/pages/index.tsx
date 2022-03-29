import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => {
    useEffect(() => {
        // add a listener to 'message' channel
        global.ipcRenderer.addListener('message', (_event, args) => {
            alert(args)
        })
    }, [])

    const onSayHiClick = () => {
        global.ipcRenderer.send('message', 'hi from next')
    }

    return (
        <Layout title="Home | Next.js + TypeScript + Electron Example">
            <h1>Hello Next.js 👋</h1>
            <button onClick={onSayHiClick}>Say hi to electron</button>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <div draggable="true"
                 style={{
                     border:'2px solid black','borderRadius':'3px',padding:'5px',display:'inline-block'
                 }}
                 onDragStart={(e) => {
                     e.preventDefault()
                     console.log('dragstart of renderer');
                     global.ipcRenderer.send('ondragstart', 'random filename')
                 }}
            >Drag me</div>
        </Layout>
    )
}

export default IndexPage
