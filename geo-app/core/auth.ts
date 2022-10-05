import axios from 'axios';

export interface UserCredentials {
  username: string;
  password: string;
}

export async function signIn(credentials: UserCredentials, callback: Function, navigate: Function) {
  setTimeout(() => {
    axios.get('http://localhost:4000/users').then(resp => {
      let data: [UserCredentials] = resp.data;
      let user = data.find(u => {
        return (credentials.username === u.username) && (credentials.password === u.password)
      });
      console.log(user);
      if (user) {
        localStorage.setItem("authentication", "true");
        localStorage.setItem("username", credentials.username);
        callback({
          error: "",
          loading: false
        })
      } else {
        callback({
          error: "Wrong Username or Password",
          loading: false
        });
      }
    }).catch(err => {
      callback("Login Failed")
    }).then(resp => {

    });
  }, 3000);
}


export async function signOut(): Promise<boolean> {
  await setTimeout(
    () => {
      localStorage.setItem("authentication", "false");
    }, 1000
  )
  return true;
}
