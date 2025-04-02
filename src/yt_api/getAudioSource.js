const getAudioSource = async (videoId) => {
    const serverUrl = "http://localhost:3000";
    const searchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    
    try {
        const response = await fetch(`${serverUrl}/get-audio?url=${encodeURIComponent(searchUrl)}`);
        const data = await response.json();

        if (response.ok) {
            return data.audioUrl;
        } else {
            alert(data.error || 'Something went wrong...');
        }
    } catch (error) {
        console.error('Error connecting to server:', error);
        alert('Could not connect to server');
    }
}

export default getAudioSource;