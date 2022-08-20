const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const canvas_data = canvas.getContext('2d')

let current_score = document.getElementById('score_number')
let button_state = document.getElementById('main_button')
let all_menu = document.getElementById('menu')
let on_score = document.getElementById('current_scoreboard')
let final_screen_score = document.getElementById('final_score')
let final_score_number = document.getElementById('value')
let game_state = document.getElementById('game_state')

let dummy_score = 0
let head = new Image()
head.src = 'head.png'
let background = new Image()
background.src = 'metu.png'

let phys105 = new Image()
phys105.src = 'phys105.png'
let phys106 = new Image()
phys106.src = 'phys106.png'
let me105 = new Image()
me105.src = 'me105.png'
let math119 = new Image()
math119.src = 'math119.png'
let math120 = new Image()
math120.src = 'math120.png'
let math260 = new Image()
math260.src = 'math260.png'
let eng102 = new Image()
eng102.src = 'eng102.png'
let chem107 = new Image()
chem107.src = 'chem107.png'
let metu_obstacle = new Image()
metu_obstacle.src = 'metu_obstacle.png'

let beginning_sound = new Audio('beginning.mp3')
beginning_sound.volume = 0.09
let death_sound = new Audio('death.mp3')
let success_sound1 = new Audio('score123.mp3')
success_sound1.volume = 0.09;





class MainPlayer{
    constructor(x_pos, y_pos, radius, color, velocity, gravity){
        this.x_pos = x_pos
        this.y_pos = y_pos
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.gravity = gravity
    }
    initiliaze_player(){
        canvas_data.beginPath()
        canvas_data.arc(this.x_pos, this.y_pos, this.radius, 0, Math.PI * 2, true)
        canvas_data.fillStyle = this.color
        canvas_data.fill()
        canvas_data.drawImage(head, this.x_pos-1.8*this.radius, this.y_pos-1.44*this.radius, 4*this.radius, 3*this.radius)
    }

    update(){
        this.initiliaze_player()
        this.y_pos = this.y_pos + this.velocity
        this.velocity = this.velocity * this.gravity
        
    }
}



const obstacle_images = [phys105, phys106, math119, math120, math260, me105, chem107, eng102, metu_obstacle]
let obstacle_list = []
class Obstacles{
    constructor(x_pos, y_pos, width, height, color, random_number, velocity){
        this.x_pos = x_pos
        this.y_pos = y_pos
        this.width = width
        this.height = height
        this.color = color
        this.random_number = random_number
        this.velocity = velocity
    }
    initiliaze_obstacles(){
        canvas_data.beginPath()
        canvas_data.fillRect(this.x_pos, this.y_pos, this.width, this.height)
        canvas_data.fillStyle = this.color
        if (typeof(obstacle_images[this.random_number]) != 'undefined'){
            canvas_data.drawImage(obstacle_images[this.random_number], this.x_pos, this.y_pos, this.width, this.height)}
        
    }
    update(){
        this.initiliaze_obstacles()
        this.x_pos = this.x_pos - this.velocity
    }

}

function spawnObstacles(){
    setInterval(()=>{
        //color = "rgb(" +  Math.floor(Math.random()*255).toString() + "," +  Math.floor(Math.random()*255).toString() + "," +  Math.floor(Math.random()*255).toString() + ")"
        
        random_height = Math.floor(Math.random()*window.innerHeight * 0.5) + window.innerHeight * 0.1
        constant_width = window.innerWidth * 0.1
        gap = window.innerHeight*0.30
        second_height = window.innerHeight - random_height - gap
        y_value = 0
        x_value = window.innerWidth
        image_index = Math.floor((Math.random()*8))
        let velocity = window.innerWidth*0.00246;

        obstacle_list.push(new Obstacles(x_value, y_value, constant_width, random_height, 'green', image_index, velocity))
        obstacle_list.push(new Obstacles(x_value, window.innerHeight - second_height, constant_width, second_height, 'green', image_index, velocity))

    }, 1800)}
    



let animationframe
function Animate(){
    let ea = test_player.radius * 0.75
    animationframe = requestAnimationFrame(Animate)
    canvas_data.clearRect(0, 0, window.innerWidth, window.innerHeight)
    canvas_data.drawImage(background, 0, 0, window.innerWidth, window.innerHeight)
    canvas_data.fillStyle = 'rgba(0,0,0,0.6)'
    canvas_data.fillRect(0, 0, window.innerWidth, window.innerHeight)
    test_player.update()
    

    current_score.innerText = Math.floor(dummy_score/43)


    if (test_player.y_pos > window.innerHeight){
        cancelAnimationFrame(animationframe)
            death_sound.play();
            beginning_sound.pause();
            success_sound1.pause();
            success_sound1.currentTime = 0;
            beginning_sound.currentTime = 0;
        all_menu.style.visibility = 'visible';
            on_score.style.visibility = 'hidden';
            button_state.innerText = 'Restart';
            final_score_number.innerText = Math.floor(dummy_score/43);
            final_screen_score.style.visibility = 'visible';
            final_score_number.style.visibility = 'visible';
            game_state.innerText = "G A M E  O V E R";
    }

    obstacle_list.forEach((Obstacles, enemy_index) => {
        Obstacles.update()

        if(Obstacles.x_pos < -Obstacles.width + test_player.x_pos){success_sound1.play();dummy_score = dummy_score + 1/2;}
        if(Obstacles.x_pos < -Obstacles.width + 12){obstacle_list.splice(enemy_index, 1); }
        

        if (Obstacles.x_pos < test_player.x_pos +ea && test_player.x_pos + ea< Obstacles.x_pos + Obstacles.width && Obstacles.y_pos + Obstacles.height > test_player.y_pos -ea && test_player.y_pos >  Obstacles.y_pos-ea){
            death_sound.play();
            beginning_sound.pause();
            beginning_sound.currentTime = 0;
            success_sound1.pause();
            success_sound1.currentTime = 0;
            cancelAnimationFrame(animationframe)
            all_menu.style.visibility = 'visible';
            on_score.style.visibility = 'hidden';
            button_state.innerText = 'Restart';
            final_score_number.innerText = Math.floor(dummy_score/43);
            final_screen_score.style.visibility = 'visible';
            final_score_number.style.visibility = 'visible';
            game_state.innerText = "G A M E  O V E R";

        }
        
    })
    
    
}
let should_jump = false;

button_state.addEventListener('click', ()=>{
    const gravity = 1.0186
    test_player = new MainPlayer(window.innerWidth*0.1, window.innerHeight*0.4, (window.innerHeight*0.060 + window.innerWidth*0.030)/2, 'rgba(240,240,0,0.4)', window.innerHeight*0.00060, gravity)
    beginning_sound.play();
    death_sound.pause();
    death_sound.currentTime = 0;
    if (button_state.innerText == 'Restart'){
        obstacle_list = [];
        dummy_score = 0;
        all_menu.style.visibility = 'hidden';
        on_score.style.visibility = 'visible';
        final_screen_score.style.visibility = 'hidden';
        final_score_number.style.visibility = 'hidden';
        test_player.y_pos =  window.innerHeight*0.4;
        Animate();
        should_jump = true;
    }

    if (button_state.innerText =='Start'){
        death_sound.pause();
        death_sound.currentTime = 0;
        all_menu.style.visibility = 'hidden';
        on_score.style.visibility = 'visible';
        should_jump = true;
        Animate();
        spawnObstacles();
    }
})




window.addEventListener('click', function(){
    if(should_jump==true){
        for (let i=25; 0<i; i--){
            this.setTimeout(()=> {test_player.y_pos -= window.innerHeight*0.00162*(i/4); }, (26-i)*9)
        }
        test_player.velocity = window.innerHeight*0.00060;
    }
    })
