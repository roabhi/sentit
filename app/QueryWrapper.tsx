'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
  children?: ReactNode
}

/**
 * ? Query Wrapper
 * ? This is a tanstack package used for encapsulation of queries
 * ? basically we use this instead of fetching directly using
 * ? the fetch API
 * ? I understand this as a kind of useContext for fetching data
 * ? in our entire application
 *
 * ? Here we basically use the package to create a new instance
 */

const queryClient = new QueryClient()

// ? Here we just say whatever children we have under this component use the package

const QueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    {children}
  </QueryClientProvider>
)

export default QueryWrapper
