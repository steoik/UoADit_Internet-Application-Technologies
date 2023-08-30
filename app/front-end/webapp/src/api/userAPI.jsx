const API_URL = 'http://127.0.0.1:8000';

let response;

export const createUser = async (data) => {
  try {
    response = await fetch(`${API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok)
      throw new Error('Failed to create new user');
    else
      console.log('User created successfully')
  }
  catch (error) {
    console.error(error);
  }
  finally {
    console.log(response);
  }
}

export const updateAvatar = async (user_name, profile_picture) => {
  try {
    const formData = new FormData()
    formData.append('profile_picture', profile_picture)
    
    response = await fetch(`${API_URL}/users/${user_name}/profile`, {
      method: 'POST',
      body: formData
    })
    if (!response.ok)
      throw new Error('Failed to update the profile picture');
    else
      console.log('Profile picture updated successfully')
  }
  catch (error) {
    console.error(error);
  }
  finally {
    console.log(response);
  }
}