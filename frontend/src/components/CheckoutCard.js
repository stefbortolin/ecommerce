import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStateValue } from '../StateProvider';
import { actionsTypes } from '../reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  action: {
    marginTop: "1rem",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center"
  },
  cardRating: {
    display: "flex"
  }
}));

export default function CheckoutCard({product:{id,name,productType,image,price,rating,description,quantity}}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [{cart}, dispatch] = useStateValue()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeItem = () => {
    dispatch({
      type: actionsTypes.REMOVE_ITEM,
      id
    })}
  

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Typography
            className={classes.action}
            variant='h5'
            color='textSecondary'
            >
              {quantity}
          </Typography>
        }
        title={name}
        subheader={`$${price}`}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.cardRating}>
            {Array(rating)
            .fill()
            .map((_, i) => (
              <p style={{fontSize: "25px"}}>☆</p>
            ))}
        </div>
        <IconButton onClick={removeItem}>
            <DeleteIcon fontsize="large"/>
        </IconButton>
      </CardActions>

    </Card>
  );
}
