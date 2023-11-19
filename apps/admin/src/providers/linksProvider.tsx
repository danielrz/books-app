import React from 'react'
import { Page } from "../types"

const LinkContext = React.createContext({pages: [] as Page[]})

const useLinkContext = () => {
  const linkContext = React.useContext(LinkContext)
  if (!linkContext) {
    throw new Error('useLinkContext must be used within a LinkProvider')
  }
  return linkContext
}

const pages: Page[] = [
  {
    name: "Website",
    path: process.env.SITE_URL || '',
  },
  {
    name: "Repository",
    path: process.env.REPO_URL || '',
  },
  {
    name: "AWS console",
    path: process.env.AWS_URL || '',
  },
  {
    name: "Amplify dashboard",
    path: process.env.AMPLIFY_URL || '',
  },
];

const LinkProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <LinkContext.Provider value={{pages}}>
      {children}
    </LinkContext.Provider>
  )
}

export {
  useLinkContext
}

export default LinkProvider