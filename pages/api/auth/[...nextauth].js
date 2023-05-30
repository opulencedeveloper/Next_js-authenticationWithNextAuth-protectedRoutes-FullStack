//we need this catch all routes because the next-auth package will expose mutiple
//route for the user sign in, sign up, log out etc, so all those special request to this
//route are automatically handled or catched by the next-auth package in this route
//go to the next-js package docs and click on rest-api to see these routes which needs to be
//catch all route if it is used

import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  //you don't use session if you are using providers like google, since it will manage
  //its own token, here we are using normal email and password foe authention
  //so we are managing the token ourselves
  session: {
    jwt: true,
  },
  //providers is how you are creating a user,
  //there are many kind of providers like, Google or Facebook
  //here we are using 'CredentialsProvider' which is email and passsword sign up
  //here the parameter 'credentials' is the submitted data,m which is email and password in the project
  providers: [
    CredentialsProvider({
      session: {
        jwt: true,
      },
      
      async authorize(credentials, req) {
        //connectToDatabase is a fn we created and imported to this file
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        //verifyPassword is a fn we created and imported to this file
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        //next-auth stores the token(Cookie) for us in our browser and appends it in every request it sends
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
