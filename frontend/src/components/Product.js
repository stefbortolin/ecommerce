import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AddShoppingCart } from '@material-ui/icons';
import { actionsTypes } from '../reducer';
import { useStateValue } from '../StateProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 220,
    height: "100%"
  },
  action: {
    marginTop: "1rem",
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function Product({product:{id,name,productType,image,price,rating,description}}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [{cart}, dispatch] = useStateValue()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToCart = () => {
    dispatch({
      type: actionsTypes.ADD_TO_CART,
      item: {
        id,
        name,
        image,
        price,
        rating
      }
    })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        subheader={`$${price}`}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {productType}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to cart" onClick={() => addToCart() }>
          <AddShoppingCart fontSize="medium" />
        </IconButton>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p style={{fontSize: "25px"}}>☆</p>
          ))}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
