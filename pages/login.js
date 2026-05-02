export default function login() {
    return `<form action="/submit" method="post">
        <input type='text' name='username' placeholder='Username'><br><br>
        <input type='password' name='password' placeholder='Password'><br><br>
        <button type='submit'>Login</button>
        </form>`
}