/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
  window.onresize=setAlignment;
  window.onload=setAlignment;
    function setAlignment(){
        var parent=document.getElementsByClassName('postContainer')[0],
        parentWidth=parent.offsetWidth,
        childs=parent.getElementsByClassName('tutorial-intro-box'),
        childWidth=childs[0].offsetWidth,
        childPerRow=Math.floor(parentWidth/childWidth),
        childMargin= Math.round((parentWidth-childPerRow*childWidth)/(childPerRow+1)),
        iterator=0,
        limit=childs.length;
  
        for(;iterator<limit;iterator++){
            childs[iterator].style.marginLeft=childMargin+'px';
        }  
        parent.style.visibility='visible';
};
})();
        

