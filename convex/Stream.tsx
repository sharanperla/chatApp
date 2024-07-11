import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
export const callUser=mutation({
    args:{
        userToCall:v.id("users"),
        signalData:v.any(),
        from:v.id("users")
    },
    handler:async(ctx,args)=>{
       await ctx.db.insert("signals",{
        ...args
       });
    }
})
export const acceptCall=mutation({
    args:{
        to:v.id("users"),
        signal:v.any()
    },
    handler:async(ctx,args)=>{
       await ctx.db.insert("acceptedCalls",{
        ...args
       });
    }
})


export const incomingCall = query({
  args: {
userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query('signals')
      .withIndex('by_userToCall', q => q.eq('userToCall', args.userId))
      .collect();
  },
});


export const declineCall = mutation({
    args: {
      id: v.id("users"), // Explicitly define 'id' as a string type
    },
    handler: async (ctx, { id }) => {
      try {
        const signals= await ctx.db.query("signals").withIndex("by_userToCall",q=>q.eq("userToCall",id)).collect()
        const acceptedCalls= await ctx.db.query("acceptedCalls").withIndex("by_to",q=>q.eq("to",id)).collect()
        // Attempt to delete using a single, more efficient query
        await Promise.all(signals.map(
            async signals=>{
                await ctx.db.delete(signals._id)
            }
        ))
        await Promise.all(acceptedCalls.map(
            async acceptedCalls=>{
                await ctx.db.delete(acceptedCalls._id)
            }
        ))
        
      } catch (error) {
        console.error(`Error declining call for user with ID ${id}:`, error);
        throw error; // Propagate the error for handling
      }
    },
  });
  