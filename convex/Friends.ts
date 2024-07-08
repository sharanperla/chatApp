import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized ");
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new ConvexError("User not found");
    }
    const friends1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();
    const friends2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
      .collect();

    const friendships = [...friends1, ...friends2];

    const friends = await Promise.all(
      friendships.map(async (friendship) => {
        const friend = await ctx.db.get(
          friendship.user1 === currentUser._id
            ? friendship.user2
            : friendship.user1
        );

        if (!friend) {
          throw new ConvexError("Friend couldnot be found");
        }
        return friend;
      })
    );

   return friends
  },
});




// export const get = query({
//     args: {},
//     handler: async (ctx, args) => {
//       const identity = await ctx.auth.getUserIdentity();
//       if (!identity) {
//         throw new Error("Unauthorized ");
//       }
//       const currentUser = await getUserByClerkId({
//         ctx,
//         clerkId: identity.subject,
//       });
//       if (!currentUser) {
//         throw new ConvexError("User not found");
//       }
//       const conversationMemberships = await ctx.db
//         .query("conversationMembers")
//         .withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id))
//         .collect();
//       const conversations =await Promise.all(
//         conversationMemberships?.map(async (membership) => {
//           const conversation = await ctx.db.get(membership.conversationId);
  
//           if (!conversation) {
//             throw new ConvexError("Conversation could not be found");
//           }
//           return conversation;
//         })
//       );
//       const conversationWithDetails = await Promise.all(
//         conversations.map(async (conversation, index) => {
//           const allConversationMemberships = await ctx.db
//             .query("conversationMembers")
//             .withIndex("by_conversationId", (q) =>
//               q.eq("conversationId", conversation?._id)
//             )
//             .collect();
  
//             const lastMessage=await getLastMessageDetails({ctx,id:conversation.lastMessageId})
  
//             if(conversation.isGroup){
//               return  {conversation,lastMessage}
//             }else{
//               const otherMembership=allConversationMemberships.filter((membership)=>membership.memberId!=currentUser._id)[0]
  
//               const otherMember=await ctx.db.get(otherMembership.memberId)
  
//               return {conversation,otherMember,lastMessage}
//             }
//         })
//       );
//       return conversationWithDetails
//     },
//   }); 