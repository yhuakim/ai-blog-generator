import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [content, setContent] = useState('')
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const inputChange = (e) => {
    setTopic(e.target.value)
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(topic)
      })
      const data = await res.json()
      console.log(data);
      if (data.status === 'success') {
        setContent(data.data)
        setLoading(false)
      } else {
        alert(data.error)
        setLoading(false)
      }
    } catch (error) {
      console.error(error?.errorMessage);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }
  return (
    <>
      <Head>
        <title>Blog Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className='text-center text-4xl py-8'>AI Article Generator</h1>
      </header>
      <main className="w-1/2 mx-auto">
        <form onSubmit={handleGenerate}>
          <div className="w-full flex">
            <label htmlFor="topic" className='w-[600px]'>
              <input type="text"
                name='topic'
                placeholder='Enter your desired topic...'
                onChange={inputChange}
                className="w-full border-b-2 p-2 mb-5 focus:outline-none"
                value={topic}
                required
              />
            </label>
            <span className={loading ? "w-[50px]" : "hidden"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin py-1 text-teal-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </span>
          </div>
          <button type='submit'
            className='bg-teal-400 text-gray-100 p-2 rounded-lg mb-5'>Generate</button>
        </form>
        <div className={content ? "w-full relative" : "hidden"}>
          <textarea name="generated-text" id=""
            rows="10"
            className='w-full border-2 rounded p-3 border-teal-400 focus:outline-none'
            value={content}
            readOnly
          >
          </textarea>
          <span className="absolute right-1 p-1 text-gray-400 hover:text-gray-700 cursor-pointer" onClick={handleCopy}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            <span className={copied ? "bg-teal-300 text-white text-sm px-1 absolute top-0 -right-14 animate-bounce" : "hidden"}>copied!</span>
          </span>
        </div>
      </main>
    </>
  )
}
