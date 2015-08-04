MJSIO = (function (){
'use strict';
//move function from Math into the namespace.
var abs = Math.abs;
var acos = Math.acos;
var asin = Math.asin;
var atan = Math.atan;
var ceil = Math.ceil;
var cos = Math.cos;
var exp = Math.exp;
var floor = Math.floor;
function log(x){
	return Math.log(x)/Math.log(10);
}
var pi = Math.PI;
var e =Math. E;
var ln = Math.log;
var pow = Math.pow;
var random = Math.random;
var round = Math.round;
var sin = Math.sin;
var sqrt = Math.sqrt;
var tan = Math.tan;

function getNumber(ele){
'use strict';
var e = document.getElementById(ele);
var c = e.value+' ';
var numbers = '0123456789';
var si_powers = [-24,-21,-18,-15,-12,-9,-6,-3,3,6,9,12,15,18,21,24];
var s = c[0];
for (var i = 1;i<c.length;i++){
var j = 'yzafpnumkMGTPEZY'.indexOf(c[i]);
if (j!=-1 ){
	//check there is a number before.
	var k = numbers.indexOf(c[i-1]);
	if (k!=-1){
		s+='e'+si_powers[j]+' ';
	} else {
		s +=c[i];
	}
} else {
	s +=c[i];}
}
var r;
var fails = s.search(/,|window|[$]|this|document|eval|self|=|_|'|"|>|<|,|;|{|}/, '');
if (fails != -1){
e.className = e.className + ' MJSIOFAIL';
e.title = r; //set the tooltip
return NaN;
}
try{
	r= parseFloat(eval(s)) ;
	
	e.className = e.className.replace(/MJSIOFAIL/g, '');
 }
 catch(err){
	r= parseFloat(s);
	e.className = e.className + ' MJSIOFAIL';
 }

 if (! isFinite(r)){
 e.className = e.className + ' MJSIOFAIL';
 }
e.title = r; //set the tooltip
return r;
}

//181 is the character code for the micro - mu symbol.
var si_prefixes = ['y','z','a','f','p','n',String.fromCharCode( 181 ),'m','.','k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
	function eng_form_postfix(number,precision){
	//return an postfix engeneering form number with at least precision significant figures.
	if (!isFinite(precision)){precision = 5;}
	precision =Math.min(Math.max(precision,1),21)
	if (Math.abs(number) < 1e-24 || Math.abs(number) >= 1e27){
		return number.toPrecision(precision);//  mjs_precision(number,precision);
	}
	var neg_sign = number <0 ? '-' : '';
	number = Math.abs(number);
	var degree = Math.floor(Math.log10(number) / 3);
    var scaled = number * Math.pow(1000, -degree);
	var first_parts = ( scaled.toFixed(Math.max((precision-3),0)) +'.').split('.');
	var last_parts =  ( scaled.toFixed(Math.max(0,precision - first_parts[0].length)) +'.').split('.');
	var postfix_form = last_parts[0]+'.'+last_parts[1] + si_prefixes[degree+8];
	if (last_parts[1].length!=0 && degree ==0){
		postfix_form = last_parts[0]+'.'+last_parts[1];
	}
	if (last_parts[1].length==0 && degree !=0){
		postfix_form = last_parts[0] + si_prefixes[degree+8];
	}
	if (last_parts[1].length==0 && degree ==0){
		postfix_form = last_parts[0];
	}
	return neg_sign+postfix_form;
}

function setNumber(ele,n,precision){
if (! isFinite(precision)){precision = 3;}
 document.getElementById(ele).textContent = eng_form_postfix(n,precision);
}

return {getNumber:getNumber,setNumber:setNumber}

}());