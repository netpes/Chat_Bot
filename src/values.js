import {createContext, useState} from "react";


export const GetData = createContext({})

const GetDataProvider = ({children}) => {
    const [userId,setUserId] = useState({});



    return <GetData.Provider value={{userId, setUserId}}>
        {children}
    </GetData.Provider>

}
export default GetDataProvider;