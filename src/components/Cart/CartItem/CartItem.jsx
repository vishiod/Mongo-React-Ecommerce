import React, { useState } from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, handleAddToCart, handleSubtractCart, handleEmptyCart, quantity }) => {
  const classes = useStyles();
  
  const CalculateSUbTotal = () =>{
    let subtotal = parseFloat(item.price.formatted_with_symbol) * parseInt(item.quantity);
    return <Typography variant="h5" component="h2"> ₹{subtotal} </Typography>;
  }

  return (
    <Card>
      <CardMedia image = {process.env.PUBLIC_URL +'/images/'+ item.media.source} alt={item.name} className={classes.media}/>

      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <span className={classes.applyPadding}/>
        <CalculateSUbTotal/>
        {/*<Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>*/}
      </CardContent>

      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={()=> handleSubtractCart(item, item.quantity - 1)}>-</Button>
          <Typography>{item.quantity} </Typography>
          <Button type="button" size="small" onClick={()=> handleAddToCart(item, item.quantity + 1)}>+</Button>
        </div>
      </CardActions>
    </Card>
  );
}
export default CartItem;
