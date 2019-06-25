import React, { useEffect, useRef } from 'react'
import Game from './Game'

export default () => {
  const game = useRef()
  const canvas = useRef()

  useEffect(() => {
    game.current = new Game({canvas: canvas.current})
    game.current.start()
  })

  
  return <canvas ref={ref => canvas.current = ref} />
}
