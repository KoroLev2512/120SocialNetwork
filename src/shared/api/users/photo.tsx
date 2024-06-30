import axios from 'axios';

async function getUserProfilePhotoUrl(userId: number): Promise<string | null> {
    try {
        const response = await axios.get('https://api.telegram.org/bot6843803274:AAG8Tw68WcdDLhXNyxrzQd5i4udmuK06t4A/getUserProfilePhotos', {
            params: {
                user_id: userId,
                limit: 1
            }
        });
        const photos = response.data.result.photos;
        if (photos.length > 0) {
            const photo = photos[0][0];
            const fileResponse = await axios.get('https://api.telegram.org/bot6843803274:AAG8Tw68WcdDLhXNyxrzQd5i4udmuK06t4A/getFile', {
                params: {
                    file_id: photo.file_id
                }
            });
            const filePath = fileResponse.data.result.file_path;
            return 'https://api.telegram.org/file/bot6843803274:AAG8Tw68WcdDLhXNyxrzQd5i4udmuK06t4A/' + filePath;
        }
    } catch (error) {
        console.error('Error getting user profile photo:', error);
    }
    return null;
}

export default getUserProfilePhotoUrl;
