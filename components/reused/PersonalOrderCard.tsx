import classes from "./PersonalOrderCard.module.scss";
import { v4 as uuidv4 } from "uuid";

const PersonalOrderCard = ({ orders }) => {
  return (
    <div className={classes.personalOrderCard}>
      {orders.map((order) => (
        <table key={order.id}>
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th className={classes.date}>{order.createdAt}</th>
            </tr>
            <tr>
              <th></th>
              <th>Menu</th>
              <th>Price/Item</th>
              <th>Amount</th>
            </tr>
            {order.products.map((product) => {
              return (
                <tr key={uuidv4()}>
                  <th>
                    <img src={product.image} width="50px" height="50px" />
                  </th>
                  <th className={classes.data}>{product.title}</th>
                  <th className={classes.data}>{product.price}$</th>
                  <th className={classes.data}>{product.amount}x</th>
                </tr>
              );
            })}

            <tr>
              <th></th>
              <th></th>
              <th className={classes.deliver}>Deliver</th>
              <th>$5</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Total:</th>
              <th>40$</th>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default PersonalOrderCard;
