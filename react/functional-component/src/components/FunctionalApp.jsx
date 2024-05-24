import React, {useState} from 'react';
export const FunctionalApp = () => {
    const [counter, setCounter] = useState(0);
    return <div>
        <p>Counter:{counter}</p>
    </div>
}