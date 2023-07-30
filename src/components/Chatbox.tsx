import { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner'

const ChatBox: React.FC = () => {
    const [message, setMessage] = useState<string>('Cant find your major? Type it in here!');
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData(name : string){
    setIsLoading(true);
    try {
        const response = await axios.get(`http://127.0.0.1:8000/pdf/${name.replace(/\s/g, "")}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}.pdf`); // or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    } finally {
        setIsLoading(false);
    }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetchData(message);
    setMessage('');
    };

    const arrow = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4 m-1 md:m-0" strokeWidth="2"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg>);

    return (
    <>
        <div className="flex flex-col h-full mt-24">
            <form onSubmit={handleSubmit} className="flex justify-center">
            <textarea 
                value={message} 
                onChange={handleInputChange} 
                className="mb-4 p-2 border border-ucfyellow text-white bg-ucfblack rounded resize-none h-16 w-[500px]"
            />
            <button type="submit" className="bg-ucfblack hover:bg-ucfyellow border border-ucfyellow hover:shadow-glow
                    transition-all duration-200 text-purple-500 rounded py-2 mx-4 w-[64px] h-[64px]">{isLoading ? <Spinner /> : (<div className="flex justify-center">{arrow}</div>)}
            </button>
            </form>
        </div>
    </>
    );
    };

export default ChatBox;
