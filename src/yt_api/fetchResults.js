const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const fetchResults = async (searchQuery) => {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=5&order=relevance&fields=items(id/videoId,snippet/title)&key=${API_KEY}`;
    
    try {
        const searchResponse = await fetch(searchUrl);
        const searchResults = await searchResponse.json();
        if (!searchResults.items || searchResults.items.length === 0) return null;
        const videosId = searchResults.items.map(item => item.id.videoId).join(',');

        if (videosId) {
            const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videosId}&fields=items(id,snippet/title,snippet/channelTitle,snippet/thumbnails,contentDetails/duration)&key=${API_KEY}`;
            const videosResponse = await fetch(videosUrl);
            const videosData = await videosResponse.json();
            
            const videosWithDetails = videosData.items.map(item => ({
                id: item.id,
                title: item.snippet.title,
                duration: formatDuration(item.contentDetails.duration),
                channelName: item.snippet.channelTitle,
                thumbnail: item.snippet.thumbnails.default.url,
            }));
            
            return videosWithDetails;
        }

    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return null;
    }
};

const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].replace('H', '') : '0';
    const minutes = match[2] ? match[2].replace('M', '') : '0';
    const seconds = match[3] ? match[3].replace('S', '') : '0';

    return `${hours !== '0' ? hours + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

export default fetchResults;