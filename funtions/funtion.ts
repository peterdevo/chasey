export const getFirstAndLastName = (username:string) => {
    const index=username.indexOf(" ");
    
    let firstname=username.slice(0,index)
    let lastname=username.slice(index+1,username.length)

    const fullName={firstname:firstname,lastname:lastname}

    return fullName;
    
  };


export const passRandom=()=>{
  const pass=[]
  let arr=["h","g","[]","21",":","d","%","#","9","o","p","&","Z","G","(",")"]
  let i=0
  while(i<arr.length){
    i++
    let result=Math.floor(Math.random() * arr.length); 
    pass.push(arr[result])
  }


  return pass.join('')
}
