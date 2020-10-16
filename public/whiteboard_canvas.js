

var canvas = document.getElementById('whiteBoard'),
    ctx = canvas.getContext('2d'),
    rect = {},
    drag = false;

var canvas2=document.getElementById('whiteBoard2');
var ctx2=canvas2.getContext('2d');

function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener("click", onClick, false);
}

init();

//$('#canvas_text').css({ display : none });
$("#canvas_text").hide();
$("#canvas_text2").hide();


//parameters for circle 
var canvasOffset=$("#whiteBoard").offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
var startX;
var startY;
var isDown=false;

//Parameters for line
var canvasx = $(canvas2).offset().left;
var canvasy = $(canvas2).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;

var freeDrawTool = false;

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
     //alert("Done");
       
     drag = false;
  }  
}

var textBoxDraw = false;
function mouseMove(e) {
  if (drag) {
    if(drawCircleCheck){  
      if(!isDown){ return; }
     // alert("Move");
      e.preventDefault();
      e.stopPropagation();
      mouseX=parseInt(e.clientX-offsetX);
      mouseY=parseInt(e.clientY-offsetY); 
      drawCircle(mouseX,mouseY,ctx2);
      //drawCircleCheck = false;
      //transmitData();
    }
    else if(drawLineCheck){
       
      mousex = parseInt(e.clientX-canvasx);
      mousey = parseInt(e.clientY-canvasy);
      drawLine(ctx2);
    }
    else{
      textBoxDraw = true;
      rect.w = (e.pageX - this.offsetLeft) - rect.startX;
      rect.h = (e.pageY - this.offsetTop) - rect.startY ;
      ctx2.clearRect(0,0,canvas2.width,canvas2.height);
      drawTextBox(ctx2);
      textBoxDraw = false;
    }
  }
}

$("#whiteBoard").mouseout(function(e){handleMouseOut(e);});
function handleMouseOut(e){
        
    if(drawCircleCheck){ 
      if(!isDown){ return; }
      e.preventDefault();
      e.stopPropagation();
      isDown=false;
      drawCircle(mouseX,mouseY,ctx);
    }
    else if(drawLineCheck){
      drawLine(ctx);
    }
    else{
      if(textBoxDraw){
        drawTextBox(ctx);
      }
    } 
}

function onClick(e) {
  if (drawCircleCheck) {
     drawCircle(mouseX,mouseY,ctx);
     return false;
  } 
  else if(drawLineCheck){
    //alert("Line");
    drawLine(ctx);
    //return false;
  }
  else {
    if(textBoxDraw){
      drawTextBox(ctx);
    }    
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
    	ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    } 
  }   
}

var $text1=document.getElementById("sourceText1");

$text1.onkeyup=function(e){ redrawTexts(); }

var inputRectField = null;

function drawTextBox(context) {

  if(!freeDrawTool){
    //alert("Ok");
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    $('#canvas_text').css({ top: rect.startY - document.getElementById('toolSection').clientHeight , left: rect.startX - 300, width : rect.w, height: rect.h });
    $("#canvas_text").show();
    $('#canvas_text2').css({ top: rect.startY - document.getElementById('toolSection').clientHeight , left: rect.startX - 300, width : rect.w, height: rect.h });
    $("#canvas_text2").show();
    context.strokeRect(rect.startX-this.offsetLeft, rect.startY-this.offsetTop, rect.w, rect.h);
    context.save();
    document.getElementById("sourceText1").removeAttribute("disabled", "false");
    document.getElementById("sourceText1").value = "";
    $('#canvas_text').val('');
  }
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
   
  $('.sourceText').val($('#canvas_text').val());
  if(Number($text1.value.length) != 0){

    $.ajax ({
        type: "post",
        url: "save.php",
        data: { rectX : rect.startX,
                rectY : rect.startY, 
                rectWidth : rect.w, 
                rectHeight : rect.h, 
                //rectText : $text1.value.substring(0, $text1.value.length - 3)
                rectText : $text1.value.substring(0, $text1.value.length - 0)
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
  freeDrawTool = false;
  //alert(drawCircleCheck);
}

var drawLineCheck = false;
function selectLine() {
  
  drawLineCheck = true;
  drawCircleCheck = false;
  freeDrawTool = false;
  
}

function selectTextBox() {
  //alert("Box");
  drawLineCheck = false;
  drawCircleCheck = false;
  freeDrawTool = false;
}

function drawCircle(x,y,context) {

  //alert("drawCircle"); 
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  context.beginPath();
  context.moveTo(startX, startY + (y-startY)/2);
  context.bezierCurveTo(startX, startY, x, startY, x, startY + (y-startY)/2);
  context.bezierCurveTo(x, y, startX, y, startX, startY + (y-startY)/2);
  //context.closePath();
  context.strokeStyle = 'black';
  context.lineWidth = 5;
  context.stroke();
}

function drawLine(context) {
    if(mousedown) {
        ctx2.clearRect(0,0,canvas2.width,canvas2.height); //clear canvas
        context.beginPath();
        context.moveTo(last_mousex,last_mousey);
        context.lineTo(mousex,mousey);
        context.strokeStyle = 'black';
        context.lineWidth = 6;
        context.lineJoin = context.lineCap = 'round';
        context.stroke();
    }
  //Output
  $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);

}

function getTextBoxValue() {
   getInputTextBoxVal = inputRectField.val();
   $('#sourceText1').val(getInputTextBoxVal);
}


