import { NextRequest, NextResponse } from "next/server";
import { SUBSCRIPTION_PLANS, stripe } from "@/src/lib/stripe";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { planId, email } = body;

        if (!planId || !["TRAVELER", "VIP"].includes(planId)) {
            return NextResponse.json(
                { error: "Invalid plan selected" },
                { status: 400 }
            );
        }

        const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];

        // Create or retrieve customer
        let customer;
        if (email) {
            const customers = await stripe.customers.list({ email, limit: 1 });
            if (customers.data.length > 0) {
                customer = customers.data[0];
            } else {
                customer = await stripe.customers.create({ email });
            }
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Naples Vacation Planner - ${plan.name} Membership`,
                            description: plan.features.join(", "),
                        },
                        unit_amount: plan.price,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://naplesvacationplanner.com"}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://naplesvacationplanner.com"}/membership`,
            customer: customer?.id,
            metadata: {
                planId: plan.id,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
