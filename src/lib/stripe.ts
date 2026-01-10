// Stripe Configuration for Naples Vacation Planner
// Replace with your actual Stripe keys in production

import Stripe from "stripe";

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2025-12-15.clover",
});

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
    FREE: {
        id: "free",
        name: "Free",
        price: 0,
        interval: "month" as const,
        features: [
            "All content access",
            "Basic trip planning",
            "Newsletter",
        ],
    },
    TRAVELER: {
        id: "traveler",
        name: "Traveler",
        price: 999, // $9.99 in cents
        priceId: "price_traveler_monthly", // Replace with real Stripe Price ID
        interval: "month" as const,
        features: [
            "Everything in Free",
            "PDF Itinerary Downloads",
            "Ad-Free Experience",
            "Priority Email Support",
            "Early Event Access",
        ],
    },
    VIP: {
        id: "vip",
        name: "VIP",
        price: 2999, // $29.99 in cents
        priceId: "price_vip_monthly", // Replace with real Stripe Price ID
        interval: "month" as const,
        features: [
            "Everything in Traveler",
            "Concierge Chat Access",
            "Exclusive Partner Deals",
            "Custom Itinerary Builder",
            "Private Experience Booking",
            "Relocation Consultation",
        ],
    },
};

// Create Checkout Session
export async function createCheckoutSession(
    planId: keyof typeof SUBSCRIPTION_PLANS,
    customerId?: string,
    successUrl?: string,
    cancelUrl?: string
) {
    const plan = SUBSCRIPTION_PLANS[planId];

    if (!plan || plan.price === 0) {
        throw new Error("Invalid plan or free plan selected");
    }

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: (plan as typeof SUBSCRIPTION_PLANS.TRAVELER).priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/membership`,
        customer: customerId,
        metadata: {
            planId: plan.id,
        },
    });

    return session;
}

// Create Customer Portal Session
export async function createPortalSession(customerId: string) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
    });

    return session;
}

// Verify Webhook Signature
export function constructWebhookEvent(payload: string, signature: string) {
    return stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ""
    );
}

// Get Subscription Status
export async function getSubscriptionStatus(subscriptionId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription: any = await stripe.subscriptions.retrieve(subscriptionId);
    return {
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
}




