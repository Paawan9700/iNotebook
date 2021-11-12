import Notecontext from "./notecontext";

const NoteState = (props) => {
    const state = {
        name : "paawan", 
        age : 21
    }

    return (
        <Notecontext.Provider value = {state}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;