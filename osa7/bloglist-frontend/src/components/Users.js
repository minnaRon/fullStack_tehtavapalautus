import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const Users = () => {
    const users = [...useSelector(state => state.allUsers)]
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td><b>blogs created</b></td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users
