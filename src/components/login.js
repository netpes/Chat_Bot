import "./signup.css"

export default function Login(){

    return <div className={'div_form'}>
        <form className={'form'} id={'form'} method='post' action={'http://localhost:2000/login'}>
            <label>Email:</label>
            <input id={'email'} className={'signUpInput'} type={'text'} name={'email'}/>
            <label>Password:</label>
            <input id={'pass'} className={'signUpInput'} type={'password'} name={'password'}/>


            <input className={'submit signUpInput'} type={'submit'} />
        </form>
    </div>

}