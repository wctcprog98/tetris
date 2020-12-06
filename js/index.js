let squares = []
const grid = document.querySelector('.grid'); 
const scoreDisplay = document.getElementsByClassName('scoreDisplay')
const startButton = document.getElementById('startBtn')
const width = 10

document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded')
    //tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1,width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2,width *2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2,width *2, width*2+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1]
        // [width, width+1, width+2, width+3]
    ]

    const tTetromino = [
        [width, width+1, width+2, width*2+1],
        [1, width+1, width+2, width*2+1],
        [1, width, width+1, width+2],
        [1, width,width+1, width*2+1]
    ]

    const squareTetromino = [
        [1, width+1, width+2,2]
    ]
    function createGrid() {
        for(let i = 0; i < 200; i++)
        {
             //create divs
            let square = document.createElement('div')
            //add classname
            square.classList.add('square')
            //array of squares
            squares.push(square)
            //append to database
            grid.appendChild(square)
        }
      
    }   

    function createTakenGrid() {
        for(let i = 0; i < 10; i++){
  //create divs
  let takenSquares = document.createElement('div')
  //add classname
  takenSquares.classList.add('taken')
  //add to squares array
  squares.push(takenSquares)
  grid.appendChild(takenSquares)
        }
    }

    const theTetrominoes = [lTetromino, zTetromino, iTetromino, tTetromino, squareTetromino]
    
    let currentPosition = 4
    let currentRotation = 0
    //randomly select a teromino and its first rotation

    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current =theTetrominoes[random][currentRotation]
    //draw first rotation in the first tetrominoe
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')

        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //make tetromino move down every second
    timerId = setInterval(moveDown, 1000) 
//assign function to keyCodes
function control(e) {
    if(e.keyCode === 37){
        moveLeft()
    }

    else if(e.keyCode === 39){
        moveRight()
    }
}

document.addEventListener('keyup', control)
//move down function
    function moveDown() {
        undraw()
        currentPosition+=width
        draw()
        freeze()
    }

    //stop/freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }
//keycodes

        function moveRight() {
            undraw() 
            const isAtRightEdge = current.some(index => (currentPosition + index % width === 0))


        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classlist.contains('taken'))){
        currentPosition +=1
        }
        draw()
    }

        function moveLeft() {
            undraw() 
            const isAtLeftEdge = current.some(index => (currentPosition + index % width === 0))

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classlist.contains('taken'))){
        currentPosition +=1
        }
        draw()
    }
    
    createGrid()
    createTakenGrid()
    draw()
    console.log(squares)
})