import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const create = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("users", args);
    } catch (error) {
      console.error("Error inserting user:", error);
      throw new Error("Failed to insert user");
    }
  },
});

export const get = internalQuery({
  args: {
    clerkId: v.string(),
  },
  async handler(ctx, args) {
    try {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
        .unique();
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  },
});
