export async function isLoggedIn() {
    const ls = localStorage.getItem('token');
    if(ls === null) return false;
    return true;
}