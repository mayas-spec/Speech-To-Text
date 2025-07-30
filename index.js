const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

const resultDiv = document.getElementById('text-output');
const feedbackDiv = document.getElementById('feedback');

function startRecognition() {
    feedbackDiv.textContent = 'Listening...';
    recognition.start();
}

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    resultDiv.textContent = transcript;
    feedbackDiv.textContent = 'Speech recognized successfully!';
};

recognition.onerror = (event) => {
    feedbackDiv.textContent = `Error: ${event.error}`;
};

recognition.onend = () => {
    feedbackDiv.textContent = '';
};

function copyDivToClipboard() {
    const text = resultDiv.textContent;
    navigator.clipboard.writeText(text).then(() => {
        feedbackDiv.textContent = 'Text copied to clipboard!';
        setTimeout(() => (feedbackDiv.textContent = ''), 2000);
    });
}