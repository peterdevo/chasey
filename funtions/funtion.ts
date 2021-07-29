export const getFirstAndLastName = (username:string) => {
    const index=username.indexOf(" ");
    
    let firstname=username.slice(0,index)
    let lastname=username.slice(index+1,username.length)

    const fullName={firstname:firstname,lastname:lastname}

    return fullName;
    
  };


export const passRandom=()=>{
  const pass=""
  let arr=["hg[]21:%)r"]
  let i=0
  while(i<arr.length){
    i++
    let result=Math.floor(Math.random() * arr.length); 
    pass.concat(arr[result])
  }


  return pass
}
