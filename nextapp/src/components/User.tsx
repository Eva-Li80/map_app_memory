"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const user = () => {
    const {data:session} = useSession()
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  )
}

export default user
