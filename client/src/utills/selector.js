
function Selector(){
    const state = {
    };
    
    return function(callback,key = null,data = null){
        if(callback === null){
            state[key] = data;
        }
        else return callback(state);
    }
    
}


export const selector = Selector();

