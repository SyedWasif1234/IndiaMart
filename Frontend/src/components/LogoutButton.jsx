import { useAuthstore } from '../store/useAuthStore';


const LogoutButton = ({children}) => {

    const {logout} = useAuthstore();
    const onLogout = async () => {
        await logout();
    }

     return (
        <button className="flex items-center justify-center gap-2 px-2 py-4 rounded text-red-900  text-red-700 hover:bg-red-700 text-gray-400 hover:text-white" onClick={onLogout}> 
            {children}
        </button>
    )
}

export default LogoutButton
