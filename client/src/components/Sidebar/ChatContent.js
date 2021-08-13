import React,{useEffect}from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  useEffect(()=>{},[props.conversation])
  const { conversation } = props;
  const { latestMessageText, otherUser,unreadAmount } = conversation;
  
  return (
    <Box className={classes.root}>
      <Box>
       
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
        
      </Box>
      {unreadAmount!==0&&(<Badge badgeContent={unreadAmount} color="primary"></Badge>)}
    </Box>
  );
};

export default ChatContent;
