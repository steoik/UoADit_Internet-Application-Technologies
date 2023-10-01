const API_URL = 'http://127.0.0.1:8000';

export const createUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok)
      throw new Error('Failed to create new user.');
    else
      console.log('User created successfully!')
  }
  catch (error) {
    console.error(error);
  }
  finally {
    // console.log(response);
  }
}

export const getUser = async (username) => {

  const endpoint = '/users/';

  try {
    const response = await fetch(`${API_URL}${endpoint}${username}`, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
    })
    if (!response.ok)
      throw new Error('Failed to get user.');
    else
      console.log('User received successfully!')
      const userInfo = await response.json();
      return userInfo
  }
  catch (error) {
    console.error(error);
  }
  finally {
    // console.log(response);
  }
}

export const updateAvatar = async (user_name, profile_picture) => {
  try {
    const formData = new FormData()
    formData.append('profile_picture', profile_picture)
    
    response = await fetch(`${API_URL}/users/${user_name}/avatar`, {
      method: 'POST',
      body: formData
    })
    if (!response.ok)
      throw new Error('Failed to update the profile picture.');
    else
      console.log('Profile picture updated successfully!')
  }
  catch (error) {
    console.error(error);
  }
  finally {
    // console.log(response);
  }
}

export const getAvatar = async (user_name) => {
  try {
    const response = await fetch(`${API_URL}/users/${user_name}/avatar`, {
      method: 'GET',
    })
    if (!response.ok)
      throw new Error('Failed to receive user Avatar.');
    else {
      console.log('User Avatar received successfully!')
      const avatar = await response.blob();
      return avatar;
    }
  }
  catch (error) {
    console.error(error);
    return null;
  }
  finally {
    // console.log(response);
  }
}

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok)
      throw new Error('Failed to receive users.');
  else{
    console.log('Users received successfully!')
    const users = await response.json();
    // console.log(users)
    return users;
  }   
}
catch (error) {
  console.error(error);
  return null;
}
finally {
    // console.log(response);
  }
}

export const hostRequest = async (username, status) => {
  try {
    const formData = new FormData()
    formData.append('status', status)
    
    const response = await fetch(`${API_URL}/users/${username}/host`, {
      method: 'POST',
      body: formData
    })
    if (!response.ok)
      throw new Error('Failed update host request status.');
    else
      console.log('Host status updated successfully!')
  }
  catch (error) {
    console.error(error);
  }
  finally {
    // console.log(response);
  }
}