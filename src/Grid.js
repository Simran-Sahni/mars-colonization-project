import React from "react";

function Grid(props)
{
    const {height, width} = props;
    let gridList = [];
    for(let i = 0; i < height; i++)
    {
        let rowList = [];
        for(let j = 0; j < width; j++)
        {
            rowList.push(
                <div
                    style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid black",
                        WebkitUserSelect: "none",
                    }}
                >

                </div>
            )
        }
        gridList.push(rowList);
    }
    console.log(gridList);
    return(
        <div className="p-4">
            <p>Hello from Grid.js</p>
            {" "}
            {gridList.map((object, index) => {
                return (
                    <div className="row justify-content-center ">
                        {" "}
                        {object}
                        {" "}
                    </div>
                );
            })}{" "}
        </div>
    )
}

export default Grid;