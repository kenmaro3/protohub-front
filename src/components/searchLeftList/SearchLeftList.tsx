import React from 'react';
import { FC, useEffect, useState } from 'react';
import "./searchleftlist.scss"

interface SearchLeftListProps {
  contents: Map<string, number>;
  functions: Map<string, any>;
}


const SearchLeftList: FC<SearchLeftListProps> = (props) => {

  const [contents, setContents] = useState<Map<string, any>>(new Map([]))
  const [functions, setFunctions] = useState<Map<string, any>>(new Map([]))

  useEffect(() => {
    setContents(props.contents)
  }, [props.contents])

  useEffect(() => {
    setFunctions(props.functions)
  }, [props.functions])


  const rowClicked = (key: string) => {
    console.log("clicked", key)
    functions.get(key)()

  }

  return (
    <div className="searchLeftListContainer">
      <>
        {Array.from(contents.keys()).map(key => {
          console.log("test")
          return (
            <>
              <div className="listRowContainer">
                <button onClick={() => rowClicked(key)} className="listRow">
                    <div className="listRowKey">
                      {key}
                    </div>
                    <div className={`listRowValue ${contents.get(key) != 0 ? "nonZero" : "zero"}`}>
                      {contents.get(key)}

                    </div>

                </button>

              </div>
            </>
          )
        })}
      </>
    </div>

  )
}

export default SearchLeftList
