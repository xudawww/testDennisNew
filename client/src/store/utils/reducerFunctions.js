export const addMessageToStore = (state, payload) => {

  const { message, sender,uid } = payload;
  let localStrageBadgeData = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)||"{}";
  let localStrageBadgeDatavalue = JSON.parse(localStrageBadgeData);
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    console.log('new msg',message)
     const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadAmount:1

    };

    localStrageBadgeDatavalue ={
      ...localStrageBadgeDatavalue,
        [`user${uid}`]:{
            ...localStrageBadgeDatavalue[`user${uid}`],
            [`con${message.conversationId}`]:1

      }
    };

    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_KEY,JSON.stringify(localStrageBadgeDatavalue));
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  console.log(uid+'ssssssssss')
  if(uid!==message.senderId){
    localStrageBadgeDatavalue ={
      ...localStrageBadgeDatavalue,
        [`user${uid}`]:{
            ...localStrageBadgeDatavalue[`user${uid}`],
            [`con${message.conversationId}`]:uid!==message.senderId?localStrageBadgeDatavalue[`user${uid}`][`con${message.conversationId}`]+1:localStrageBadgeDatavalue[`user${uid}`][`con${message.conversationId}`]
  
      }
    };
    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_KEY,JSON.stringify(localStrageBadgeDatavalue));

  }
  return state.map((convo) => {
    console.log(convo.unreadAmount)
    if (convo.id === message.conversationId) {
       return {
        ...convo,
        messages:[...convo.messages, message],
        latestMessageText:message.text,
        unreadAmount:uid!==message.senderId?convo.unreadAmount+1:convo.unreadAmount

        };
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};
export const updateConvoUnreadNumber=(state,obj)=>{
  let localStrageBadgeData = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)||"{}";
  let localStrageBadgeDatavalue = JSON.parse(localStrageBadgeData);
  localStrageBadgeDatavalue ={
      ...localStrageBadgeDatavalue,
        [`user${obj.uid}`]:{
            ...localStrageBadgeDatavalue[`user${obj.uid}`],
            [`con${obj.id}`]:0

        }
      }
localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_KEY,JSON.stringify(localStrageBadgeDatavalue));
  return state.map((convo) => {
    if (convo.id === obj.id) {
      const convoCopy = { ...convo,unreadAmount:0 };
      return convoCopy;
    } else {
      return convo;
    }
  });
}
export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};
  console.log(state)
  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};


export const queryAndAssignUnreadBadge = (state,id)=>{
  let localStrageBadgeData = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)||"{}";
  console.log(localStrageBadgeData )
  let localStrageBadgeDatavalue = JSON.parse(localStrageBadgeData);
  let getUnreadVal = (localStrageBadgeDatavalue[`user${id}`]||{});
  return state.map((convo) => {
    let result =  getUnreadVal[`con${convo.id}`]
    console.log(result)
    if(result===undefined){
      result = convo.messages.reduce(function(sum, convoEle) {
      return (convoEle.senderId !== id) ? sum+1 : sum;
      }, 0);
      localStrageBadgeDatavalue ={
      ...localStrageBadgeDatavalue,
        [`user${id}`]:{
            ...localStrageBadgeDatavalue[`user${id}`],
            [`con${convo.id}`]:result 

        }
      }
      localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_KEY,JSON.stringify(localStrageBadgeDatavalue))
      
    }
   return {...convo,unreadAmount:localStrageBadgeDatavalue[`user${id}`][`con${convo.id}`]}


    })


}


export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      let convoClone = {...convo}
      convoClone .id = message.conversationId;
      convoClone .messages.push(message);
      convoClone .latestMessageText = message.text;
      return convoClone ;
    } else {
      return convo;
    }
  });
};
