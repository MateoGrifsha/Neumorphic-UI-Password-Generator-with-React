import {useState} from 'react'
import { useCopyToClipboard } from "@uidotdev/usehooks";

const SliderForm = () => {

    const [data, setData] = useState(16)
    const [password, setPassword] = useState([''])
    const [number, setNumber] = useState(false)
    const [lowercase, setLowercase] = useState(false)
    const [uppercase, setUppercase] = useState(false)
    const [symbol, setSymbol] = useState(false)
    const [copiedText, copyToClipboard] = useCopyToClipboard()
    const [hasCopiedText, setHasCopiedText] = useState(false)
    let passwordArray = new Array();
    const numberCharset = '123456789'
    const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz'
    const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const symbolCharset = '!@#$%^&*()_'
    let wholeCharset = ''

    const generatePassword = () => {
        if(!number && !lowercase && !uppercase && !symbol) alert('Must pick one of the specifications!')
        if(number) wholeCharset = wholeCharset + numberCharset
        if(lowercase) wholeCharset = wholeCharset + lowercaseCharset
        if(uppercase) wholeCharset = wholeCharset + uppercaseCharset
        if(symbol) wholeCharset = wholeCharset + symbolCharset

        for(let i = 0; i < data; i++){
            let index = Math.floor(Math.random() * wholeCharset.length)
            passwordArray.push(wholeCharset.charAt(index)) 
        }
        setPassword(passwordArray)
        setHasCopiedText(false)
        return passwordArray
    }


    return ( 
        <div className="input-container">
            <h1>Password Generator</h1>
            <div className="inputs">
                <label>No. of characters</label>
                <input type="range" min='8' max='24' value ={data} onChange={(e) => setData(e.target.value)}/>
                <output>{data}</output>
                
                <div className="checkbox-container">
                    <div className="checkboxes"><input type="checkbox" onChange={() => {
                        if(number) setNumber(false)
                        if(!number) setNumber(true)
                    }}/> Numbers </div>
                    <div className="checkboxes"><input type="checkbox" onChange={() => {
                        if(lowercase) setLowercase(false)
                        if(!lowercase) setLowercase(true)
                    }}/> Lowercase Letters</div>
                    <div className="checkboxes"><input type="checkbox" onChange={() => {
                        if(uppercase) setUppercase(false)
                        if(!uppercase) setUppercase(true)
                    }}/> Uppercase Letters</div>
                    <div className="checkboxes"><input type="checkbox" onChange={() => {
                        if(symbol) setSymbol(false)
                        if(!symbol) setSymbol(true)
                    }}/> Symbols </div>
                </div>

                <button className='generate-password' onClick={generatePassword}>Generate Password</button>

                <div className="generated-password">{password}<button onClick={() => {
                    copyToClipboard(password.join(''))
                    setHasCopiedText(true);
                }}>{!hasCopiedText && <p>COPY</p>} {hasCopiedText && <p className='copied-clipboard'>Copied To Clipboard</p>}</button></div>
            </div>
        </div>
     );
}
 
export default SliderForm; 