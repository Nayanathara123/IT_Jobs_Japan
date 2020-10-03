

var canvas = document.getElementById('whiteBoard'),
    ctx = canvas.getContext('2d'),
    rect = {},
    drag = false;

function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener("click", onClick, false);
}

init();

//parameters for circle 
var canvasOffset=$("#whiteBoard").offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
var startX;
var startY;
var isDown=false;

//Parameters for line
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;

function mouseDown(e) {
  if(drawCircleCheck){
     // e.preventDefault();
      //e.stopPropagation();
      startX=parseInt(e.clientX-offsetX);
      startY=parseInt(e.clientY-offsetY);
      isDown=true;
      drag=true;
      //alert("Down");
  }
  else if(drawLineCheck){
      last_mousex = parseInt(e.clientX-canvasx);
      last_mousey = parseInt(e.clientY-canvasy);
      mousedown = true;
      drag=true;
  }
  else{
    //alert("Down");
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
  }
}

function mouseUp(e) {
  if (drawCircleCheck) {
     if(!isDown){ return; }
      e.preventDefault();
      e.stopPropagation();
      isDown=false;
  } 
  else if(drawLineCheck){
      mousedown = false;
  }
  else {
     drag = false;
  }  
}

function mouseMove(e) {
  if (drag) {
    if(drawCircleCheck){  
      if(!isDown){ return; }
     // alert("Move");
      e.preventDefault();
      e.stopPropagation();
      mouseX=parseInt(e.clientX-offsetX);
      mouseY=parseInt(e.clientY-offsetY); 
      drawCircle(mouseX,mouseY);
      //drawCircleCheck = false;
    }
    else if(drawLineCheck){
       
        mousex = parseInt(e.clientX-canvasx);
        mousey = parseInt(e.clientY-canvasy);
        drawLine();
    }
    else{
      rect.w = (e.pageX - this.offsetLeft) - rect.startX;
      rect.h = (e.pageY - this.offsetTop) - rect.startY ;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawTextBox();
    }
  }
}

$("#whiteBoard").mouseout(function(e){handleMouseOut(e);});
function handleMouseOut(e){
    if(!isDown){ return; }
    e.preventDefault();
    e.stopPropagation();
    isDown=false;
}

function onClick(e) {
  if (drawCircleCheck) {
     return false;
  } 
  else if(drawLineCheck){
     return false;
  }
  else {

    var element = canvas;
    var offsetX = 0, offsetY = 0

    if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }

    x = e.pageX - offsetX;
    y = e.pageY - offsetY;

    if (x<=rect.startX+rect.w && x>=rect.startX && y<=rect.startY+rect.h && y>=rect.startY) {
    	console.log(x +" "+y);
    	
    } else {
    	ctx.clearRect(0,0,canvas.width,canvas.height);
    } 
    }   
}

var $text1=document.getElementById("sourceText1");

$text1.onkeyup=function(e){ redrawTexts(); }

function drawTextBox() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    ctx.save();
    document.getElementById("sourceText1").removeAttribute("disabled", "false");
    document.getElementById("sourceText1").value = "";
}

function redrawTexts(){

  var buildText = wrapText(ctx, $text1.value, rect.startX, rect.startY + 20, rect.w, "16px","Arial", 16);
}

function wrapText(context, text, x, y, maxWidth, fontSize, fontFace, lineHeight){

      var words = text.split(' ');
      var line = '';
      var lineHeight=lineHeight*1.2;

      context.font=fontSize+" "+fontFace;

      for(var n = 0; n < text.length-1; n++) {
        if(n<=0){
          var testLine = line + text[n] + ' ';
        }
        else{
          var testLine = line + text[n-1] + ' ';
        }
        
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if(y+(lineHeight*0.5) > rect.startY+rect.h) {
         	//alert(y + " " + (rect.startY+rect.h));
           document.getElementById("sourceText1").setAttribute("disabled", "disabled");
           return false;
        }

        if(testWidth > maxWidth) {

            context.fillText(line, x, y);
            line = text[n-1] + ' ';
            y += lineHeight; 
             
        }       
        else {
          //alert("Ok2");
          line = testLine;
          //rectInsideText = rectInsideText + line;
        }
      }

      context.fillText(line, x, y);
      
      return(y);
}


function saveCanvas(){
   
  if(Number($text1.value.length) != 0){

    $.ajax ({
        type: "post",
        url: "save.php",
        data: { rectX : rect.startX,
                rectY : rect.startY, 
                rectWidth : rect.w, 
                rectHeight : rect.h, 
                rectText : $text1.value.substring(0, $text1.value.length - 3)
            },
        success: function( result ) {
            alert("Thank you !!! Now your content is view to Project Manager");
            //alert(result);
        }
    });
  }
  else{
    alert("Sorry! No text to save");
  }	
}

var drawCircleCheck = false;
function selectCircle() {
  
  drawCircleCheck = true;
  drawLineCheck = false;
  //alert(drawCircleCheck);
}

var drawLineCheck = false;
function selectLine() {
  
  drawLineCheck = true;
  drawCircleCheck = false;
  
}

function selectTextBox() {
  drawLineCheck = false;
  drawCircleCheck = false;
}

function drawCircle(x,y) {

  //alert("drawCircle"); 
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.moveTo(startX, startY + (y-startY)/2);
  ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y-startY)/2);
  ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y-startY)/2);
  //ctx.closePath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.stroke();
}

function drawLine() {
    if(mousedown) {
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
        ctx.beginPath();
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 6;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
  //Output
  $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);

}