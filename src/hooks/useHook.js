
import {useState} from 'react'


const useHook = ({location, history}) => {

const [lochis, setLochis] = useState({location: location, history: history})

    return [lochis, setLochis]
}

export default useHook;