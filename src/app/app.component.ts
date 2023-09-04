import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  oringY = 200;
  oringX = 200;
  monsterOringX = 600;
  animatedId:any;
  animatedMonster:any;
  animatedMonster2:any;

  ngOnInit(): void {
    const user = document.getElementById('user')!;
    user.style.top =  this.oringY + "px";
    user.style.left = this.oringX + "px";

    const monster = document.getElementById('monster')!;
    monster.style.top =  this.oringY + "px";
    monster.style.left = this.monsterOringX + "px";
    monster.setAttribute('hidden','true');
    
    const monster2 = document.getElementById('monster2')!;
    monster2.style.top =  100 + "px";
    monster2.style.left = this.monsterOringX + "px";
    monster2.setAttribute('hidden','true');

    const _this = this;
    document.body.addEventListener("keydown",(e)=>{
      console.log(e.code);
      if(e.code =='ArrowUp'){
        _this.jump();
      }
    });
    
    this.randerMove(monster);
    this.randerMove(monster2);
  }

  jump(){
    const user = document.getElementById('user')!;
    if(user.offsetTop != this.oringY){
      return;
    }
    
    this.animatedId = setInterval(()=>{
      if(user.offsetTop > 50){
        user.style.top = user.offsetTop - 1 +"px";
      }else{
        this.jump_down();
      }
    },1);
  }

  jump_down(){
    const user = document.getElementById('user')!;
    clearInterval(this.animatedId);

    this.animatedId = setInterval(()=>{
      if(user.offsetTop != this.oringY){
        user.style.top = user.offsetTop + 1 + "px";
      }else{
        clearInterval(this.animatedId);
      }
    },1);
  }

  monster_move(monster:HTMLElement){
    const user = document.getElementById('user')!;
    monster.removeAttribute('hidden');

    if(monster.offsetLeft != this.monsterOringX){
      return;
    }

    const animated = setInterval(()=>{
      if(monster.offsetLeft != this.oringX){
        monster.style.left = monster.offsetLeft - 1 + "px";

        if(this.checkOverlapping(user,monster)){
          alert('失敗~');
          clearInterval(animated);
          monster.style.left = this.monsterOringX + "px";
          this.randerMove(monster);
          monster.setAttribute('hidden','true');
        }
      }else{
        clearInterval(animated);
        monster.style.left = this.monsterOringX + "px";
        this.randerMove(monster);
        monster.setAttribute('hidden','true');
      }
    },1);
  }

  randerMove(monster:HTMLElement){
    const random = (5000 * Math.random());
    console.log(random);
    setTimeout(() => {
      this.monster_move(monster);
    }, random);
  }

  checkOverlapping(user:HTMLElement, monster:HTMLElement):boolean{
    const userBlock = user.getBoundingClientRect();
    const monsterBlock = monster.getBoundingClientRect();
    return (userBlock.right >= monsterBlock.left && userBlock.bottom >= monsterBlock.top 
      && userBlock.left <= monsterBlock.left && userBlock.top <= monsterBlock.top);
  }
}
