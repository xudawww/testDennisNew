bug1:Fix the problem of mgs not showing directyly


Feature 2:Add the feature of unread msg, the screenshot is in  UnreadMsg_Scrren_shot


Feature 3 questions:
1.
 First of all, the struecture of the state needs to be changed, right now we are using 
state like state:{ conversations:{messages:[]}}, if we need to change as room chat, it should be changes as just state:{messages:[]}, and under the key of msgs,we modify as example as following:
{
createdAt: "2021-08-11T13:52:30.715Z"
id: 17
senderId: 8
text: "111"
updatedAt: "2021-08-11T13:52:30.715Z"}
Because we dont need conversation Id anymore, there is nothing meanningful to have conversation object,And for the websocket, we dont need to do any change, because your websocket is actually a broadcast, so it's good for group chat already.

However, the way to add the msg into state needs to be changed:
right now the corresponding function is like once getting the message, it checks if the conversation id of this message is in the list of the state of conversations. if it is, just add
the message, but now it's a groupd chat, we have to skip this step and just add the messages into our states.

2:
I think we need to preserve the old way to do 1 to 1 chat at beggining, we shouldn't just change anything causing sth confusing to users, then we just add another state first, and write additional action and rootreducer, after developing all frontend and backend,have another url set up for developing and testing purposes for developers, however the customers can't access to this page, in the end, if all the things work, it could then start to merge,however, the private chat should still be preserved, and then send the customers the email, and set up the fixed header on website and notify them the 1 to 1 chat will be changed as group chat, then after 3 days(As announced in notification), we just change the private chat to group chat.






