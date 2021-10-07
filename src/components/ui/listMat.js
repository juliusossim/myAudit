import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 420,
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
              <Link key={prop.name} to={prop.link} className={clss?.item}>
                {
                  !_.isEmpty(prop.icon) && <ListItemIcon>{prop.icon}</ListItemIcon>
                }
                <ListItemText className={prop.icon ? 'pl-3' : 'my-3'} primary={prop.name} />
              </Link>
            );
          }
          return (
            <ListItem key={prop.name} onClick={prop.onClick} className={prop.pointer ? `pointer ${clss?.item}` : clss.item}>
              {
                !_.isEmpty(prop.icon) && <ListItemIcon>{prop.icon}</ListItemIcon>
              }
              <ListItemText className={prop.icon ? 'pl-3' : 'my-3'} primary={prop.name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
export default ListMat;
