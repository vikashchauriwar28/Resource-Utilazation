export class AuthService{
    [x: string]: any;
    isLoggedIn : boolean =false;
    currentUser: any;
 
    isAuthenticated(){
        let myPromise = new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(this.isLoggedIn)
            }, 1000);
        })
        return myPromise
    }

    login(user: any){
        this.isLoggedIn = true;
        this.currentUser = user;
    }

    logOut(){
        this.isLoggedIn =false;
        this.currentUser = null;
    }
}