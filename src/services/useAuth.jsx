export function useAuth() {
    const token = JSON.parse(localStorage.getItem('token'));
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

    if (!token) {
        return false;
    }

    return {
        token: token,
        isAdmin: isAdmin
    };
}