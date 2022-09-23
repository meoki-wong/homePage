import React from 'react'
import ErrorAnimate from '../components/ErrorAnimate'
export default function Error() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "100vh"
    }}>
        <ErrorAnimate />
    </div>
  )
}
