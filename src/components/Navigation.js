import { useEffect, useState } from "react"
import { useUser } from "../context/User"

const Navigation = ({ users }) => {
    const { user, setUser } = useUser()
    const [username, setUsername] = useState('Ted')

    useEffect(() => {
        const spec = users.find(ele => ele.id === user)
        setUsername(spec.name)
    }, [user])

    return (
        <div className="nav-main">
            <div className="greeting">Hello! {username}</div>
            <select onChange={(e) => setUser(e.target.value)}>

            </select>
        </div>
    )
}

export default Navigation
