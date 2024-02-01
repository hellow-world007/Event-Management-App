import { Fragment } from "react";
import OrdersGrid from "@/components/orders/orders-list";
import { useRouter } from "next/router";
import Head from "next/head";

function OrderDetailsPage() {
  const router = useRouter();
  const ID = router.query.orderId;

  return (
    <Fragment>
      <Head>
        <title>All Orders</title>
        <meta
          name="description"
          content="see all the orders by different users!"
        />
      </Head>
      <OrdersGrid ID={ID} />
    </Fragment>
  );
}

export default OrderDetailsPage;
