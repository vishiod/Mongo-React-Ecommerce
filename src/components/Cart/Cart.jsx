import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, handleAddToCart, handleSubtractCart, handleEmptyCart, quantity }) => {
  
  const classes = useStyles();

  const TotalPrice = () =>{
    let total = 0;
    cart.forEach((item)=>{
      total += parseFloat(item.price.formatted_with_symbol) * parseInt(item.quantity);
    });
    return <Typography variant="h5" component="h2">Total: ₹{total} </Typography>;
  }

  const EmptyCart = () => {
    return (
      <Typography variant = "subtitle1"> Your Shopping cart is empty,
        <Link to="/" className={classes.link}>start adding some</Link>!
      </Typography>
    );
  }

  const FilledCart = () =>{
    return (
      <>
        <Grid container spacing={3}>
        {
          cart.map((item)=>{
            return (
              <section>
                <Grid item xs={12} sm={4} key={item._id} spacing={3}>
                  <CartItem item={item}             
                  handleAddToCart={handleAddToCart}
                  handleSubtractCart={handleSubtractCart}
                  handleEmptyCart={handleEmptyCart}
                  quantity={quantity}/>
                </Grid>
              </section>
              );
            })
          }
          </Grid>
          <main className={classes.cardDetails}>
              {/*<Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>*/}
              <TotalPrice/>
              <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={()=>handleEmptyCart()}>Empty Cart</Button>
                <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Check Out</Button>
              </div>
          </main>
      </>
    );
  }

  return(
    <Container>
      <div className={classes.toolbar}/>
      <Typography className={classes.title} variant="h3" gutterBottom> Your Shopping Cart</Typography>
      {cart.length ? <FilledCart/>: <EmptyCart/>}
    </Container>
  );
}
export default Cart;
