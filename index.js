
// 'use strict';
// console.log('hello, world!');

// const express =require('express');
// const app =express();

// app.get('/', (req ,res)=>{
//     res.send('a');
// });

// app.listen(8000);

// // const board2 =[
// // [{
// //  opened:false
// // },{
// //  hasBom:false,
// //  opened:false,
// // },{
// //  hasBom:false,
// //  opened:false,
// // }]
// // ];0;


const express =require('express');
const app =express();
const width = 10;
const height = 10;



// const board2 ={
//  hasBom:false,
//  opened:false,
// };



const board =[];

for ( let i=0; i<width; i++){ 
        board[i]=[]
    for ( let j=0; j<height; j++){ 
        board[i][j]={
            hasBom:false,
            opened:false,
           }    
    }
}




let BomCount = 10;
let arr=[];
 
while(BomCount > 0) {
 
    BomCount--;

    // let i = Math.floor(Math.random() *9);
    // let j = Math.floor(Math.random() *9);
    let i = BomCount
    let j = BomCount
    arr.push([i,j]);
        board[i][j] = { hasBom: true, opened: false }
        
        
}



  let count=0;


app.get('/board', (req ,res)=>{

    for ( let i=0; i<width; i++){ 
    for ( let j=0; j<height; j++){ 
       delete board[i][j].hasBom
    }
}

   let x= req.query.x;
   let y= req.query.y;

   board[y][x]= { opened: true }


arr.map(( value, index, array )=>{


    if(board[y][x]==board[array[index][0]][array[index][1]]){


    //「array」と「index」を利用して、元の配列データを変更する
    board[array[index][0]][array[index][1]]= { exploded: true,opened: true }
                    count++;

                    delete array[index];
    
                }

});

if(count==1){

    arr.map(( value, index, array )=>{
    //「array」と「index」を利用して、元の配列データを変更する
    board[array[index][0]][array[index][1]]= { // アクセスした場所に爆弾があった
                    exploded: true,
                    opened: false, // 開いている
                                      }
                })
            
            count=0;};


   
   res.json(board);   
  
});

app.listen(8000);



console.log(board);