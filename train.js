//C-TASK:
function isSameLetters(same1, same2) {
  const same = word => word.split('').sort().join('');

  if (same(same1) === same(same2)) {
    return true;
  } else {
    return false;
  }
}

console.log(isSameLetters('practice', 'icetcarp'));

//B-TASK:

// function countDigits(text) {
//   let count = 0;
//   for (let ele of text) {
//     if (ele >= '0' && ele <= '9') {
//       count++;
//     }
//   }
//   return count;
  
// } 
// console.log(countDigits("h9kj1kjk7eyt4jgg3oii9g5jgd6bg3"));





//A-TASK: 

//Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi letterni ikkinchi parametrdagi sozdan qatnashga sonini return qilishi kerak boladi.
//MASALAN countLetter("e", "engineer") 3ni return qiladi.

// function countLetter(a, b) {
//     let count = 0;

//     for (let harfIndex = 0; harfIndex < b.length; harfIndex++) {
//         if (b[harfIndex] === a)  {
//             count++;
//         }
//     }
    
//     return count;
// }


// console.log("Natija:", countLetter("e", "engineer"));




// console.log("Jack Ma maslahatlari");
// const list = [
// "yahshi talaba boling", // 0-20
// "togri boshliq tanlang va koproq hato qiling", // 20-30
// "uzingizga ishlashingizni boshlang", // 30-40
// "siz kuchli bolgan narsalarni qiling", // 40-50
// "yoshlarga investitsiya qiling", // 50-60
// "endi dam oling, foydasi yoq endi", // 60
// ];


// // CALLBACK function 
// function maslahatBering(a, callback) {
// if (typeof a != "number") callback("insert a number", null); 
// else if (a <= 20) callback(null, list [0]);
// else if (a > 20 && a <= 30) callback(null, list[1]);
// else if (a > 30 && a <= 40) callback(null, list[2]);
// else if (a > 40 && a <= 50) callback(null, list[3]);
// else if (a > 50 && a <= 60) callback(null, list[4]);
// else {
//     //setTimeout
//         setInterval(function () {
//       callback(null, list[5]);
//     }, 1000)
//  }
// } 

// console.log("passed here 0");
// maslahatBering (65, (err, data) => {          // => function parametr sifatida ishga tushadi (err, data) => callback function
//     if (err) console.log("ERROR:", err);
    
//     console.log("javob:", data);
// });

// console.log("passed here 1");




// // ASYNCRONOUS function 
// async function maslahatBering(a,) {
//     if (typeof a != "number") throw new Error("insert a number", null); 
//     else if (a <= 20) return list[0];
//     else if (a > 20 && a <= 30) return list[1];
//     else if (a > 30 && a <= 40) return list[2];
//     else if (a > 40 && a <= 50) return list[3];
//     else if (a > 50 && a <= 60) return list[4];
//     else {
//         return new Promise((resolve, reject) => {
//             //setTimeout
//              setInterval(() => {
//                 resolve(list[5]);
//             }, 1000);
//         });
//      }
//     } 
//
/// ASYNC ishga tushdi
//     console.log("passed here 0");  // 1- ishga tushdi
// maslahatBering (25)
// .then(data => {                     // 2- ishga tushsa ham  va hech qanday setTimeout  qilmadik                                         
//     console.log("javob:", data);    //  lekin javobni log qilmadi va pastga 3- linega tushdi
// })
// .catch(err => {
//     console.log("ERROR:", err);
// });

// console.log("passed here 1");   // 3 

// async function run() {
//     let javob = await maslahatBering(65);   
//     console.log(javob);
    // javob = await maslahatBering(66);
    // console.log(javob);
    // javob = await maslahatBering(41);
    // console.log(javob);
//}
//run();



// console.log("===== EXECUTE =====");

// // DEFINE
// function qoldiqliBolish(a, b, chaqirish) {
//   if (b === 0) {
//     chaqirish("Mahraj nolga teng bololmaydi", null);
//   } else {
//     chaqirish(null, b % a);
//   }
// }

// // CALL
// qoldiqliBolish(10, 0, (data, err) => {
//   if (data) console.log("data:", data);
//   else {
//     console.log("Error:", err);
//   }
// });


// console.log("===== EXECUTE =====");

// // DEFINE
// function ayrish(a, b, callback) {
//   if (b === 10) {
//     callback("bizga 15 soni kerak!", null);
//   } else {
//     callback(null, a - b);
//   }
// }

// // CALL
// ayrish(30, 15, (err, data) => {
//   if (err) console.log("Error:", err);
//   else {
//     console.log("data:", data);
//   }
// });