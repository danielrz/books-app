import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useState, useEffect } from "react";

interface UserDetails {
  email?: string
  firstName?: string
  lastName?: string
}

const useUserDetails = () => {
  const { authStatus, signOut } = useAuthenticator((context) => [
    context.user,
  ]);

  const [userDetails, setUserDetails] = useState<UserDetails>()

  useEffect(() => {
    async function handleFetchUserAttributes() {
      try {
        const userAttributes = await fetchUserAttributes();
        setUserDetails({
          email: userAttributes.email,
          firstName: userAttributes.given_name,
          lastName: userAttributes.family_name
        })
      } catch (error) {
        console.log(error);
      }
    }
    if (authStatus === 'authenticated') {
      handleFetchUserAttributes();
    }
  }, [authStatus]);

  return {
    userDetails,
    signOut
  }
}

export default useUserDetails