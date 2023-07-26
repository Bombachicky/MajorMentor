import axios from 'axios';

async function fetchData() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/pdf', { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); // or any other extension
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

export function EmptyPdf() {
    return (
        <div>
            <h1>Study Materials Generator</h1>
            <button onClick={fetchData}>Generate PDF for Computer Science</button>
        </div>
    );
};

