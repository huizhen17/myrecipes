import React, {useEffect, useState} from 'react'
import Homepage from './Homepage'

function Favourite() {
    const [user, setLoginUser] = useState({});

    useEffect(() => {
      getLocalUsers();
    },[]);
  
    const getLocalUsers = () => {
      if(localStorage.getItem('userinfo') === null){
        localStorage.setItem('userinfo',JSON.stringify([]));
        setLoginUser([]);
      }else{
        let user = JSON.parse(localStorage.getItem('userinfo'));
        setLoginUser(user);
      }
    };

    return (
        <>
        <Homepage user={user}/>
            
        </>
    )
}

export default Favourite
