import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
function ListItemLink(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component="a" {...props} />;
}
const ListMat = ({ props, clss }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders" className={clss?.main}>
        {props.map((prop) => {
          if (prop.link) {
            return (
              <ListItemLink key={prop.name} href={prop.link} className={`pointer ${clss?.item}`}>
                <ListItemIcon>{prop.icon}</ListItemIcon>
                <ListItemText primary={prop.name} />
              </ListItemLink>
            );
          }
          return (
            <ListItem key={prop.name} onClick={prop.onClick} className={`pointer ${clss?.item}`}>
              <ListItemIcon>{prop.icon}</ListItemIcon>
              <ListItemText primary={prop.name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
export default ListMat;
