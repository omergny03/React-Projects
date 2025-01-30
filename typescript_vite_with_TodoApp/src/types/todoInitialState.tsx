export interface TodoInitialState{
    todos:TodoState[],
  
}

export interface TodoState{
    id:number,
    content:string,
}