const simulationSpeed = 10
const width = 160
const height = 90

let perf = performance.now()
let board = Array.from({length: width}, _ => new Array(height).fill('air'));
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let selected = undefined
let mouseDown = false
let mouse2Down = false
let mouseX = 0
let mouseY = 0

const loop = () => {
    setTimeout(loop, simulationSpeed)
    ctx.clearRect(0,0,canvas.width,canvas.height)

    for(let x = 0; x<board.length; x++){
        for(let y = 0; y<board[x].length; y++){
            if(board[x][y]=='sand'){
                ctx.fillStyle = 'yellow'
                ctx.fillRect(x,y,1,1)

                if(board[x][y+1]=='air'){
                    board[x][y+1]='sand_'
                    board[x][y]='air'
                }
                else if((y!=height-1&&x!=0&&board[x-1][y+1]=='air')&&board[x-1][y]=='air'){
                    board[x-1][y+1]='sand_'
                    board[x][y]='air'
                }
                else if((y!=height-1&&x!=width-1&&board[x+1][y+1]=='air')&&board[x+1][y]=='air'){
                    board[x+1][y+1]='sand_'
                    board[x][y]='air'
                }
            }
            if(board[x][y]=='rock'){
                ctx.fillStyle = 'gray'
                ctx.fillRect(x,y,1,1)
            }
        }
    }


    for(let x = 0; x<board.length; x++){
        for(let y = 0; y<board[x].length; y++){
            if(board[x][y]=='sand_'){
                board[x][y]='sand'
            }
        }
    }
}
loop()

console.log(-perf+performance.now())

canvas.addEventListener('mousemove', e => {
    console.log('mouse')
    const rect = e.target.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    mouseX = Math.trunc(x)
    mouseY = Math.trunc(y)
    if(mouse2Down){
        board[mouseX][mouseY]='air'

    }
    if(selected&&mouseDown){
        board[mouseX][mouseY]=selected
    }
})
addEventListener('mousedown', e => {
    if(e.button==0){
        mouseDown = true
    }
    if(e.button==2){
        mouse2Down = true
    }
})

addEventListener('mouseup' , e => {
    if(e.button==0){
        mouseDown = false
    }
    if(e.button==2){
        mouse2Down = false
    }
})
addEventListener('keypress', e => {
    if(e.key=="1"){
        selected = 'sand'
    }
    if(e.key=="2"){
        selected = 'rock'
    }
})

document.addEventListener('contextmenu', event => event.preventDefault());


/*const simulationSpeed = 10
const width = 160
const height = 90


let perf = performance.now()
let board = Array.from({length: width}, _ => new Array(height).fill('air'));
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


let mouse0Down = false
let mouse1Down = false
let mouse2Down = false
let mouseX = 0
let mouseY = 0


const loop = () => {
    setTimeout(loop, simulationSpeed)
    ctx.clearRect(0,0,canvas.width,canvas.height)

    for(let x = 0; x<board.length; x++){
        for(let y = 0; y<board[x].length; y++){
            if(board[x][y]=='sand'){
                ctx.fillStyle = 'yellow'
                ctx.fillRect(x,y,1,1)

                if(board[x][y+1]=='air'){
                    board[x][y+1]='sand_'
                    board[x][y]='air'
                }
                else if(y!=height-1&&x!=0&&board[x-1][y+1]=='air'){
                    board[x-1][y+1]='sand_'
                    board[x][y]='air'
                }
                else if(y!=height-1&&x!=width-1&&board[x+1][y+1]=='air'){
                    board[x+1][y+1]='sand_'
                    board[x][y]='air'
                }
            }
            if(board[x][y]=='rock'){
                ctx.fillStyle = 'gray'
                ctx.fillRect(x,y,1,1)
            }
        }
    }


    for(let x = 0; x<board.length; x++){
        for(let y = 0; y<board[x].length; y++){
            if(board[x][y]=='sand_'){
                board[x][y]='sand'
            }
        }
    }
}
loop()

console.log(-perf+performance.now())

canvas.addEventListener('mousemove', e => {
    const rect = e.target.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    mouseX = Math.trunc(x)
    mouseY = Math.trunc(y)
    if(mouse0Down){
        board[mouseX][mouseY]='sand'
    }
    else if(mouse1Down){
        board[mouseX][mouseY]='rock'
    }
    else if(mouse2Down){
        board[mouseX][mouseY]='air'
    }
})
addEventListener('mousedown', e => {
    if(e.button==0){
        mouse0Down = true
    }
    if(e.button==1){
        mouse1Down = true
    }
    if(e.button==2){
        mouse2Down = true
    }
})

addEventListener('mouseup' , e => {
    if(e.button==0){
        mouse0Down = false
    }
    if(e.button==1){
        mouse1Down = false
    }
    if(e.button==2){
        mouse2Down = false
    }
})

document.addEventListener('contextmenu', event => event.preventDefault());*/