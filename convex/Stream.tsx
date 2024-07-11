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