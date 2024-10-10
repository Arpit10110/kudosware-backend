import { shopify } from "../app.js";

export const createorder = async (req, res) => {
  const { customerId, lineItems, totalPrice, shippingPrice, paymentId, address1, city, province, country, zip } = req.body;

  try {
    // Check if lineItems are provided
    console.log("Line Items:", lineItems);
    if (!lineItems || lineItems.length === 0) {
      return res.status(400).json({ status: false, message: "No line items provided" });
    }

    // Map line items
    const mappedLineItems = lineItems.map(item => ({
      variant_id: item.variantId,  // Product variant ID
      quantity: item.quantity || 1,  // Use quantity or default to 1
    }));
    console.log("Mapped Line Items:", JSON.stringify(mappedLineItems, null, 2));

    // Shopify order creation payload
    const orderPayload = {
      order: {
        customer: {
          id: Number(customerId),
        },
        line_items: mappedLineItems,  // Ensure mapped line items are passed
        shipping_address: {
          address1: address1,
          city: city,
          province: province,
          country: "IN",  // Use ISO country code for India
          zip: zip,
        },
        total_price: Number(totalPrice),  // Ensure it's a number
        shipping_lines: [
          {
            title: "Standard Shipping",
            price: Number(shippingPrice),  // Ensure it's a number
          },
        ],
        financial_status: "paid",  // Mark as paid since payment is processed by Razorpay
        transactions: [
          {
            kind: 'sale',
            status: 'success',
            amount: Number(totalPrice),  // Ensure it's a number
            gateway: 'razorpay',  // Payment gateway (Razorpay)
            authorization: paymentId,  // Razorpay payment ID
          },
        ],
      },
    };

    console.log("Order Payload:", JSON.stringify(orderPayload, null, 2));

    // Create the order using Shopify SDK
    const order = await shopify.order.create(orderPayload);

    res.json({
      status: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    // Log the error response if available for more insights
    if (error.response) {
      console.error("Error details:", error.response.body);
    }
    res.status(500).json({
      status: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

export const fetchAllOrders = async (req, res) => {
    try {
      // Fetch orders from Shopify
      const orders = await shopify.order.list();
  
      res.json({
        status: true,
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({
        status: false,
        message: "Error fetching orders",
        error: error.message,
      });
    }
  };