import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "./config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    return <div>
    <Appbar />
    <div className=" flex justify-center">
    <div className=" max-w-screen-lg w-full pt-8">
        <input onChange={(e) => {
            setTitle(e.target.value)
        }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 outline-none"placeholder="Title">
        </input>
        <TextEditor onChange={(e) => {
            setContent(e.target.value)
        }}/>
        <button onClick={async () => {
            const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            navigate(`/blog/${res.data.id}`)
        }} 
            type="submit" className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-slate-600">
            Publish post
        </button>
    </div>
    </div>
    </div>
}

function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
return <div>
<textarea onChange={onChange} id="message" rows={8} className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-400 outline-none" placeholder="Write your content here..."></textarea>
</div>
}