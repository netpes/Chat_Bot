import "./signup.css"

export default function Signup() {

    return <div className={'div_form'}>
        <form className={'form'} method={'post'} action={'http://localhost:2000/signup'}>
            <label>Name:</label>
            <input className={'signUpInput'} type={'text'} name={'name'}/>
            <label>Password:</label>
            <input className={'signUpInput'} type={'password'} name={'password'}/>
            <label>Email:</label>
            <input className={'signUpInput'} type={'email'} name={'email'}/>
            <input className={'submit signUpInput'} type={'Submit'}/>
        </form>
    </div>
}