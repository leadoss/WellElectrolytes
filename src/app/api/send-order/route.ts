import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { form, items, shipping, payment, subtotal, discount, shippingCost, grandTotal, appliedPromo } = body;

  const itemLines = items
    .map((item: { product: { name: string }; size: { label: string }; quantity: number; product: { salePrice: number }; size: { multiplier: number } }) =>
      `• ${item.product.name} (${item.size.label}) x${item.quantity} = $${(item.product.salePrice * item.size.multiplier * item.quantity).toFixed(2)}`
    )
    .join("\n");

  const emailBody = `
NEW ORDER — Well Electrolytes
==============================

CUSTOMER DETAILS
----------------
Name: ${form.firstName} ${form.lastName}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}

DELIVERY ADDRESS
----------------
Address: ${form.address}
City: ${form.city}
Region: ${form.region}
Notes: ${form.notes || "None"}

ORDER ITEMS
-----------
${itemLines}

ORDER SUMMARY
-------------
Subtotal: $${subtotal.toFixed(2)}
${discount > 0 ? `Discount (${appliedPromo?.code} ${appliedPromo?.percentPct}%): -$${discount.toFixed(2)}\n` : ""}Shipping (${shipping === "express" ? "Express" : "Standard"}): ${shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
TOTAL: $${grandTotal.toFixed(2)}

PAYMENT METHOD
--------------
${payment === "cod" ? "Cash on Delivery" : "Credit / Debit Card"}

==============================
  `.trim();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Well Electrolytes Orders" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Order from ${form.firstName} ${form.lastName} — $${grandTotal.toFixed(2)}`,
      text: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
