class AthenticationService {
    
    successfulLogin(username, role, token){
        sessionStorage.setItem('authenticatedUserId', username);
        sessionStorage.setItem('authenticatedUserRole', role);
        sessionStorage.setItem('authenticatedUserToken', token);
    }

    logout(){
        sessionStorage.removeItem('authenticatedUserId');
        sessionStorage.removeItem('authenticatedUserRole');
        sessionStorage.removeItem('authenticatedUserToken');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUserId');
        if (user === null) return false;
        return true;
    }

    loggedUserName(){
        let name = sessionStorage.getItem('authenticatedUserId');
        if (name === null) return '';
        return name;
    }

    loggedUserRole() {
        let role = sessionStorage.getItem('authenticatedUserRole');
        if(role != null) return role;
        return null;
    }

    loggedUserToken() {
        let role = sessionStorage.getItem('authenticatedUserToken');
        if(role != null) return role;
        return null;
    }

}
 
export default new AthenticationService();