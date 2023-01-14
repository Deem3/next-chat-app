const getOtherEmails = (users, currentUser) => {
    return users?.filter(user => user!==currentUser.email)[0]
}

export default getOtherEmails