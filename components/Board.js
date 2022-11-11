import React, {useState} from "react";

export function Board() {
  const [boards, setBoards] = useState([
    {id: 1, title:'Задача', items: [{id: 1, title: 'Задача 1'}, {id: 2, title: 'Задача 2'}, {id: 3, title: 'Задача 3'}]},
    {id: 2, title:'В процессе', items: [{id: 4, title: 'Задача 4'}, {id: 5, title: 'Задача 5'}, {id: 6, title: 'Задача 6'}]},
    {id: 3, title:'Выполнено', items: [{id: 7, title: 'Задача 7'}, {id: 7, title: 'Задача 8'}, {id: 9, title: 'Задача 9'}]}
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.target.style.boxShadow = '0 4px 3px gray'
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }
  
  return (
    <div className="boardBox">
      {boards.map(board => 
        <div className="board"
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className="board__title">{board.title}</div>   
          {board.items.map(item => 
            <div className="board__item"
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
            >{item.title}</div>
          )}
        </div>)}
    </div>
  )
}
