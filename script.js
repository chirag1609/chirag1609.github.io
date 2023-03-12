score = 0;
cross = true
document.onkeydown = function(e){
    console.log("Key Code is: ", e.keyCode)
    if(e.keyCode === 38){
        dino = document.querySelector('.dino')
        dino.classList.add('animateDino') //add a classlist,, it will mean when this class will be added the the dino will jump and we will also remove it as when this keydown will trigger we will again need to act on it, so first remove it and add it again
        setTimeout(()=>{
            dino.classList.remove('animateDino')
        },700)
    }
    else if (e.keyCode === 39){
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'))
        dino.style.left = dinoX + 112 + 'px'
    }
    else if(e.keyCode === 37){
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'))
        dino.style.left = dinoX - 112 + 'px'
    }
}
setInterval(()=>{ //to check if you are not colliding with your obstacle on every 100ms
    dino = document.querySelector('.dino')
    gameOver = document.querySelector('.gameOver')
    obstacle = document.querySelector('.obstacle')

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')) // it will give the computed value of the dino 
    //for the computed style(first arguement need to specify variable for and second pseudo value can be null)
    //dx will give us the current value of the movement in every 100 milli seconds
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'))
    //now will also find the computed distance for the obstacle with the name of ox and oy
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'))
    // we will need to convert it into an integer as computer style will give the result in pixels
    //Now we will take the difference between them to check the difference and see if they are colliding

    offsetX = Math.abs(dx-ox)
    offsetY = Math.abs(dy-oy)

    console.log(offsetX,offsetY)

    if(offsetX < 73 && offsetY < 52){ //condtion agar takragaye to
        gameOver.style.visibility = 'visible'
        obstacle.classList.remove('obstacleAni')
    }
    else if(offsetX <145 && cross) { 
        score += 1
        updateScore(score)
        cross = false //by default the cross will be true and after in else the cross will become false now
        setTimeout(()=>{
            cross = true; //again when after a sec dinasour crosses then score to be updated and cross to true for next jumps
        },1000)
        setTimeout(()=>{
        aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'))
        newDur = aniDur - 0.1 //to increase the speed after every count
        obstacle.style.animationDuration = newDur + 's'
        },500)
        
    } 

},10)

function updateScore(score){
    document.querySelector('#scoreCont').innerHTML = "Your Score: " + score
}