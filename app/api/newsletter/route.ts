import { type NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// Define Newsletter schema
const NewsletterSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true,
      unique: true, // Prevent duplicate email subscriptions
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    }
  },
  { timestamps: true }
);

// Get Newsletter model (create if it doesn't exist)
const getNewsletterModel = () => {
  return mongoose.models.Newsletterr || mongoose.model("Newsletterr", NewsletterSchema);
};

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Get the Newsletter model
    const Newsletter = getNewsletterModel();
    
    // Parse request data
    const data = await request.json();
    
    // Validate email
    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email: data.email.toLowerCase() });
    if (existingSubscription) {
      return NextResponse.json({ 
        success: true, 
        message: "You're already subscribed to our newsletter!" 
      }, { status: 200 });
    }
    
    // Create new subscription
    const newsletter = new Newsletter({ email: data.email.toLowerCase() });
    await newsletter.save();
    
    return NextResponse.json({ 
      success: true, 
      message: "Subscribed successfully! Thank you for joining our newsletter." 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error("Error saving newsletter subscription:", error);
    
    // Handle mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ 
        error: "Please provide a valid email address" 
      }, { status: 400 });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json({ 
        success: true,
        message: "You're already subscribed to our newsletter!" 
      }, { status: 200 });
    }
    
    // Log detailed error for debugging
    console.error("Newsletter validation error details:", error.message);
    
    return NextResponse.json({ 
      error: "Failed to subscribe. Please try again later." 
    }, { status: 500 });
  }
}