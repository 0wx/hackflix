import jwtDecode from 'jwt-decode'

export const getUser = () => {
  try {
    return jwtDecode(localStorage.getItem('access_token'))
  } catch (error) {
    return null
  }
}
