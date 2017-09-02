export const setUsersRequest = (users) => {
  if (Array.isArray(users)) {
    window
      .localStorage
      .setItem('users', JSON.stringify(users))
    return users
  }
}

export const getUsersRequest = () => {
  let stringUsers = window
    .localStorage
    .getItem('users')
  let users = []

  try {
    users = JSON.parse(stringUsers)
  } catch (e) {}

  return Array.isArray(users)
    ? users
    : []
}
