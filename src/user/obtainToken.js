export default function obtainToken(){
 const token = document.cookie.split(';').find((ele)=>ele.startsWith('Authorization=')).split('=')[1];
 return token
}