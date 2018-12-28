//TODO: Find good stopping point, or 'zoom out' as time goes on

let full=[];//toothpicks can't add onto
let open=[];//toothpicks with one or 2 open edges
let length=10;//length of one toothpick
let minY=0;
let maxY;
let factor;

function setup() {
  createCanvas(innerWidth,innerHeight);
  open.push([-length/2,0,length/2,0]);//each toothpick is an array of 4 values, x1,y1,x2,y2
  maxY=height;
}

function draw() {
  background(0);
  let temp=[];//store toothpicks added this run
  translate(width/2,height/2);
  factor=height/(maxY-minY);
  scale(factor);

  //draw full toothpicks
  for(let i=0;i<full.length;i++){
    stroke(255,0,0);
    strokeWeight(2);
    line(full[i][0],full[i][1],full[i][2],full[i][3]);
  }

  //empty out open toothpicks and handle them
  for(let i=open.length-1;i>=0;i--){
    //draw toothpick
    stroke(255,0,0);
    strokeWeight(2);
    line(open[i][0],open[i][1],open[i][2],open[i][3]);
    //check which ends are open
    let p1=true;
    let p2=true;
    //check against full toothpicks
    for(let j=0;j<full.length;j++){
      if((open[i][0]==full[j][0]&&full[j][1]==open[i][1])||(open[i][0]==full[j][2]&&full[j][3]==open[i][1])){
        p1=false;
      }
      if((open[i][2]==full[j][0]&&full[j][1]==open[i][3])||(open[i][2]==full[j][2]&&full[j][3]==open[i][3])){
        p2=false;
      }
    }
    //check against other open toothpicks
    for(let j=0;j<open.length;j++){
      if(j!=i){//if not the current toothpick
        if((open[i][0]==open[j][0]&&open[j][1]==open[i][1])||(open[i][0]==open[j][2]&&open[j][3]==open[i][1])){
          p1=false;
        }
        if((open[i][2]==open[j][0]&&open[j][1]==open[i][3])||(open[i][2]==open[j][2]&&open[j][3]==open[i][3])){
          p2=false;
        }
      }
    }
    //check against new toothpicks?
    for(let j=0;j<temp.length;j++){
      if((open[i][0]==temp[j][0]&&temp[j][1]==open[i][1])||(open[i][0]==temp[j][2]&&temp[j][3]==open[i][1])){
        p1=false;
      }
      if((open[i][2]==temp[j][0]&&temp[j][1]==open[i][3])||(open[i][2]==temp[j][2]&&temp[j][3]==open[i][3])){
        p2=false;
      }
    }
    //figure out if this toothpick is horizontal or vertical
    let vert=(open[i][0]==open[i][2]);
    //add new toothpicks to open ends
    if(p1){
      if(vert){
        temp.push([open[i][0]-length/2,open[i][1],open[i][0]+length/2,open[i][1]]);
      }else{
        temp.push([open[i][0],open[i][1]-length/2,open[i][0],open[i][1]+length/2]);
      }
    }
    if(p2){
      if(vert){
        temp.push([open[i][2]-length/2,open[i][3],open[i][2]+length/2,open[i][3]]);
      }else{
        temp.push([open[i][2],open[i][3]-length/2,open[i][2],open[i][3]+length/2]);
      }
    }
    //move toothpick out of open array
    full.push(open[i]);
    open.pop();
  }
  //draw new toothpicks and add them to open or full
  for(let i=0;i<temp.length;i++){
    //check if it is added offscreen
    minY=min(minY,temp[i][1]);
    maxY=max(maxY,temp[i][3]);
    //draw toothpick
    stroke(0,255,0);
    strokeWeight(2);
    line(temp[i][0],temp[i][1],temp[i][2],temp[i][3]);
    //check which ends are open
    let p1=true;
    let p2=true;
    //check against full toothpicks
    for(let j=0;j<full.length;j++){
      if((temp[i][0]==full[j][0]&&full[j][1]==temp[i][1])||(temp[i][0]==full[j][2]&&full[j][3]==temp[i][1])){
        p1=false;
      }
      if((temp[i][2]==full[j][0]&&full[j][1]==temp[i][3])||(temp[i][2]==full[j][2]&&full[j][3]==temp[i][3])){
        p2=false;
      }
    }
    //check against other new toothpicks
    for(let j=0;j<temp.length;j++){
      if(j!=i){//if not the current toothpick
        if((temp[i][0]==temp[j][0]&&temp[j][1]==temp[i][1])||(temp[i][0]==temp[j][2]&&temp[j][3]==temp[i][1])){
          p1=false;
        }
        if((temp[i][2]==temp[j][0]&&temp[j][1]==temp[i][3])||(temp[i][2]==temp[j][2]&&temp[j][3]==temp[i][3])){
          p2=false;
        }
      }
    }
    //if neither end is open it is full
    if(!p1&&!p2){
      full.push(temp[i]);
    }else{
      open.push(temp[i]);
    }
  }
}
