export const setGroupsRequest = (groups) => {
  if (Array.isArray(groups)) {
    window
      .localStorage
      .setItem('groups', JSON.stringify(groups))
    return groups
  }
}

export const getGroupsRequest = () => {
  let stringGroups = window
    .localStorage
    .getItem('groups')
  let groups = []

  try {
    groups = JSON.parse(stringGroups)
  } catch (e) {}

  return Array.isArray(groups)
    ? groups
    : []
}
