import React from 'react'
import { useSpring, animated } from 'react-spring'

const calc = (x: any, y: any) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans: any = (x: any,y: any,s: any) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export interface BoxProps {
  name: string
  id: string
  itemAdded: (item: any) => any;
}
const Box: React.FC<BoxProps> = ({ name, id, itemAdded }) => {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

  return (
    <animated.div
    onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
    onMouseLeave={() => set({ xys: [0, 0, 1] })}
    style={{ transform: props.xys.interpolate(trans), float:'left'}}
  >
    <a style={{height: '100px', width: '100px', padding: '10px'}} href={`#${name}`} onClick={()=> itemAdded({name, id})}>
      <img width="150" alt={name} src={`images/burger-assets/${name}.png`}/>
    </a>
    </animated.div>
  )
}

export default Box;


