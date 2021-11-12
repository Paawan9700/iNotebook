import React , {useState} from 'react'
import Notecontext from "./notecontext";

const NoteState = (props) => {
   const initialnotes = [
    {
      "_id": "618e4b8f276d21a344ed49c0",
      "user": "6188a98b62a0a708caa74bf1",
      "title": "my channel",
      "description": "welcome to my channel",
      "tag": "You Tube",
      "Date": "2021-11-12T11:10:07.483Z",
      "__v": 0
    },
    {
      "_id": "618e4b97276d21a344ed49c2",
      "user": "6188a98b62a0a708caa74bf1",
      "title": "my channel 2",
      "description": "welcome to my channel 2",
      "tag": "You Tube 2",
      "Date": "2021-11-12T11:10:15.635Z",
      "__v": 0
    },
    {
      "_id": "618e4b9f276d21a344ed49c4",
      "user": "6188a98b62a0a708caa74bf1",
      "title": "my channel 3",
      "description": "welcome to my channel 3",
      "tag": "You Tube 3",
      "Date": "2021-11-12T11:10:23.544Z",
      "__v": 0
    }
  ]

  const [notes, setnotes] = useState(initialnotes)

    return (
        <Notecontext.Provider value = {{initialnotes, setnotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;